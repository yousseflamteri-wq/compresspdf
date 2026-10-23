'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Download,
  AlertCircle,
  AlertTriangle,
  Loader2,
  RefreshCw,
  ArrowRight,
  Lock,
  Star,
  Pencil,
  ShieldCheck,
} from 'lucide-react';

const TARGET_BYTES = 200 * 1024;
const MAX_FILE_BYTES = 400 * 1024 * 1024;
const MIN_PIXELS = 15_000;
const MIN_IMAGE_BYTES = 8 * 1024;

const PRESETS = {
  low: {
    id: 'low',
    label: 'Low Compression',
    shortLabel: 'Low',
    subLabel: 'Print quality first',
    levels: [
      { maxDim: 2200, quality: 0.85 },
      { maxDim: 1800, quality: 0.78 },
    ],
    recompressFlate: true,
    minGain: 0.98,
    // No raster fallback on Low — always keeps 100% selectable vector text
  },
  recommended: {
    id: 'recommended',
    label: 'Recommended',
    shortLabel: 'Recommended',
    subLabel: 'Best for email & sharing',
    featured: true,
    levels: [
      { maxDim: 1500, quality: 0.7 },
      { maxDim: 1200, quality: 0.62 },
    ],
    recompressFlate: true,
    minGain: 0.96,
    raster: {
      minSaved: 0.05, // Only rasterize if vector pass saved less than 5%
      levels: [
        { scale: 1.4, quality: 0.62 },
        { scale: 1.2, quality: 0.52 },
      ],
    },
  },
  extreme: {
    id: 'extreme',
    label: 'Extreme',
    shortLabel: 'Extreme <200KB',
    subLabel: 'Portal limit: under 200KB',
    levels: [
      { maxDim: 1100, quality: 0.55 },
      { maxDim: 850, quality: 0.42 },
      { maxDim: 650, quality: 0.32 },
      { maxDim: 500, quality: 0.25 },
    ],
    targetBytes: TARGET_BYTES,
    recompressFlate: true,
    minGain: 0.98,
    raster: {
      levels: [
        { scale: 1.3, quality: 0.5 },
        { scale: 1.1, quality: 0.4 },
        { scale: 0.9, quality: 0.34 },
        { scale: 0.75, quality: 0.28 },
      ],
    },
  },
};

/* Custom SVG matching the red-badged PDF document icon in the screenshot */
function PdfDocumentIcon({ className = 'w-11 h-12 shrink-0' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 44 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Page Body */}
      <path
        d="M8 2H29L38 11V44C38 46.2091 36.2091 48 34 48H8C5.79086 48 4 46.2091 4 44V6C4 3.79086 5.79086 2 8 2Z"
        fill="#F8FAFC"
        stroke="#CBD5E1"
        strokeWidth="1.5"
      />
      {/* Folded Corner */}
      <path
        d="M29 2V9C29 10.1046 29.8954 11 31 11H38L29 2Z"
        fill="#E2E8F0"
        stroke="#CBD5E1"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Classic Red PDF Trefoil Ribbon */}
      <path
        d="M21.5 13.5C20.2 13.5 19.6 15.8 20.8 19.2C19.3 22.4 17.1 25.8 14.8 27.6C12.3 29.5 11.4 30.8 12.1 31.7C12.9 32.6 15.1 31.2 17.5 28.1C20.4 26.8 24.3 25.8 27.5 25.6C29.9 27.4 31.8 27.8 32.4 26.8C33 25.7 31.5 24.4 28.7 23.9C26.2 21.8 23.8 18.8 22.8 16.2C23.1 14.4 22.5 13.5 21.5 13.5Z"
        stroke="#DC2626"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bottom Red PDF Banner */}
      <rect x="3" y="35" width="36" height="11" rx="2.5" fill="#DC2626" />
      <text
        x="21"
        y="43"
        fill="#FFFFFF"
        fontSize="7.5"
        fontWeight="800"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        textAnchor="middle"
        letterSpacing="0.06em"
      >
        PDF
      </text>
    </svg>
  );
}

export function formatBytes(n) {
  if (!n || n === 0) return '0 B';
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(n < 10240 ? 1 : 0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

const tick = () => new Promise((resolve) => setTimeout(resolve, 0));

function isMobileOrLowMemory() {
  if (typeof window === 'undefined') return false;
  const isSmallScreen = window.innerWidth < 768;
  const isLowRam =
    typeof navigator !== 'undefined' &&
    navigator.deviceMemory &&
    navigator.deviceMemory <= 4;
  return Boolean(isSmallScreen || isLowRam);
}

function getMemoryLimits() {
  const mobile = isMobileOrLowMemory();
  return {
    maxPixels: mobile ? 8_000_000 : 16_000_000,
    maxCanvasPixels: mobile ? 6_000_000 : 14_000_000,
    maxRasterPasses: mobile ? 2 : 4,
  };
}

async function inflate(bytes) {
  try {
    const stream = new Blob([bytes])
      .stream()
      .pipeThrough(new DecompressionStream('deflate'));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  } catch {
    if (bytes.length <= 2) throw new Error('short deflate stream');
    const rawSlice = bytes.subarray(2);
    const stream = new Blob([rawSlice])
      .stream()
      .pipeThrough(new DecompressionStream('deflate-raw'));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  }
}

async function unpredictPng(data, width, height, colors) {
  const bpp = colors;
  const rowBytes = width * colors;
  const stride = rowBytes + 1;
  if (data.length < stride * height) throw new Error('short image data');
  const out = new Uint8Array(rowBytes * height);
  let lastYield = performance.now();

  for (let y = 0; y < height; y++) {
    if (y % 16 === 0 && performance.now() - lastYield > 12) {
      await tick();
      lastYield = performance.now();
    }
    const filterType = data[y * stride];
    const inOff = y * stride + 1;
    const outOff = y * rowBytes;
    const prevOff = outOff - rowBytes;
    for (let x = 0; x < rowBytes; x++) {
      const raw = data[inOff + x];
      const left = x >= bpp ? out[outOff + x - bpp] : 0;
      const up = y > 0 ? out[prevOff + x] : 0;
      const upLeft = y > 0 && x >= bpp ? out[prevOff + x - bpp] : 0;
      let value;
      switch (filterType) {
        case 1:
          value = raw + left;
          break;
        case 2:
          value = raw + up;
          break;
        case 3:
          value = raw + ((left + up) >> 1);
          break;
        case 4: {
          const p = left + up - upLeft;
          const pa = Math.abs(p - left);
          const pb = Math.abs(p - up);
          const pc = Math.abs(p - upLeft);
          value = raw + (pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft);
          break;
        }
        default:
          value = raw;
      }
      out[outOff + x] = value & 255;
    }
  }
  return out;
}

function rawToImageData(raw, width, height, comps) {
  const image = new ImageData(width, height);
  const d = image.data;
  const total = width * height;
  let p = 0;
  let q = 0;
  for (let i = 0; i < total; i++) {
    if (comps === 1) {
      const g = raw[p++];
      d[q++] = g;
      d[q++] = g;
      d[q++] = g;
    } else {
      d[q++] = raw[p++];
      d[q++] = raw[p++];
      d[q++] = raw[p++];
    }
    d[q++] = 255;
  }
  return image;
}

const num = (PL, dict, key) => {
  const v = dict.lookup(PL.PDFName.of(key));
  return v instanceof PL.PDFNumber ? v.asNumber() : undefined;
};

function getFilters(PL, dict) {
  const f = dict.lookup(PL.PDFName.of('Filter'));
  if (!f) return [];
  if (f instanceof PL.PDFName) return [f.decodeText()];
  if (f instanceof PL.PDFArray) {
    const names = [];
    for (let i = 0; i < f.size(); i++) {
      const item = f.lookup(i);
      names.push(item instanceof PL.PDFName ? item.decodeText() : '?');
    }
    return names;
  }
  return ['?'];
}

function getComponents(PL, dict) {
  const cs = dict.lookup(PL.PDFName.of('ColorSpace'));
  if (cs instanceof PL.PDFName) {
    const name = cs.decodeText();
    if (name === 'DeviceRGB') return 3;
    if (name === 'DeviceGray') return 1;
    if (name === 'DeviceCMYK') return 4;
    return 0;
  }
  if (cs instanceof PL.PDFArray) {
    const first = cs.lookup(0);
    if (first instanceof PL.PDFName && first.decodeText() === 'ICCBased') {
      const profile = cs.lookup(1);
      const n = profile && profile.dict ? num(PL, profile.dict, 'N') : undefined;
      return n === 1 || n === 3 || n === 4 ? n : 0;
    }
  }
  return 0;
}

async function recompressImage(PL, doc, ref, stream, level, preset) {
  const N = (k) => PL.PDFName.of(k);
  const dict = stream.dict;

  const imageMask = dict.lookup(N('ImageMask'));
  if (imageMask instanceof PL.PDFBool && imageMask.asBoolean()) return 0;
  if (dict.has(N('Mask')) || dict.has(N('Decode'))) return 0;

  const width = num(PL, dict, 'Width');
  const height = num(PL, dict, 'Height');
  if (!width || !height) return 0;
  const pixels = width * height;
  const { maxPixels } = getMemoryLimits();
  if (pixels > maxPixels || pixels < MIN_PIXELS) return 0;

  const filters = getFilters(PL, dict);
  if (filters.length !== 1) return 0;

  const original = stream.getContents();
  if (original.length < MIN_IMAGE_BYTES) return 0;

  const comps = getComponents(PL, dict);
  let source = null;
  let out = null;
  let srcW;
  let srcH;

  try {
    if (filters[0] === 'DCTDecode') {
      if (comps !== 1 && comps !== 3) return 0;
      const blob = new Blob([original], { type: 'image/jpeg' });
      try {
        source = await createImageBitmap(blob, { imageOrientation: 'none' });
      } catch {
        source = await createImageBitmap(blob);
      }
      srcW = source.width;
      srcH = source.height;
    } else if (filters[0] === 'FlateDecode') {
      if (!preset.recompressFlate) return 0;
      if (comps !== 1 && comps !== 3) return 0;
      if (num(PL, dict, 'BitsPerComponent') !== 8) return 0;

      const parms = dict.lookup(N('DecodeParms'));
      if (parms instanceof PL.PDFArray) return 0;
      let predictor = 1;
      if (parms instanceof PL.PDFDict) {
        predictor = num(PL, parms, 'Predictor') || 1;
        if (predictor >= 10) {
          const cols = num(PL, parms, 'Columns') || 1;
          const colors = num(PL, parms, 'Colors') || 1;
          const pbpc = num(PL, parms, 'BitsPerComponent') || 8;
          if (cols !== width || colors !== comps || pbpc !== 8) return 0;
        } else if (predictor !== 1) {
          return 0;
        }
      }

      let raw = await inflate(original);
      if (predictor >= 10) raw = await unpredictPng(raw, width, height, comps);
      else if (raw.length < width * height * comps) return 0;

      const flat = document.createElement('canvas');
      flat.width = width;
      flat.height = height;
      flat
        .getContext('2d')
        .putImageData(rawToImageData(raw, width, height, comps), 0, 0);
      source = flat;
      srcW = width;
      srcH = height;
    } else {
      return 0;
    }

    const scale = Math.min(1, level.maxDim / Math.max(srcW, srcH));
    const nw = Math.max(1, Math.round(srcW * scale));
    const nh = Math.max(1, Math.round(srcH * scale));

    out = document.createElement('canvas');
    out.width = nw;
    out.height = nh;
    const ctx = out.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, nw, nh);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(source, 0, 0, nw, nh);

    const jpeg = await new Promise((resolve) =>
      out.toBlob(resolve, 'image/jpeg', level.quality)
    );
    if (!jpeg) return 0;

    const bytes = new Uint8Array(await jpeg.arrayBuffer());
    if (bytes.length >= original.length * preset.minGain) return 0;

    const replacement = doc.context.stream(bytes, {
      Type: 'XObject',
      Subtype: 'Image',
      Width: nw,
      Height: nh,
      ColorSpace: 'DeviceRGB',
      BitsPerComponent: 8,
      Filter: 'DCTDecode',
      Length: bytes.length,
    });
    const smask = dict.get(N('SMask'));
    if (smask) replacement.dict.set(N('SMask'), smask);
    doc.context.assign(ref, replacement);

    return original.length - bytes.length;
  } finally {
    if (source) {
      if (typeof source.close === 'function') source.close();
      else {
        source.width = 0;
        source.height = 0;
      }
    }
    if (out) {
      out.width = 0;
      out.height = 0;
    }
  }
}

function dropOrphans(PL, doc) {
  const ctx = doc.context;
  if (!ctx.trailerInfo.Root) return;
  const seen = new Set();
  const stack = [ctx.trailerInfo.Root];
  if (ctx.trailerInfo.Info) stack.push(ctx.trailerInfo.Info);

  while (stack.length) {
    const o = stack.pop();
    if (!o) continue;
    if (o instanceof PL.PDFRef) {
      const key = o.toString();
      if (seen.has(key)) continue;
      seen.add(key);
      const target = ctx.lookup(o);
      if (target) stack.push(target);
    } else if (o instanceof PL.PDFDict) {
      for (const v of o.values()) stack.push(v);
    } else if (o instanceof PL.PDFArray) {
      for (const v of o.asArray()) stack.push(v);
    } else if (o instanceof PL.PDFStream) {
      stack.push(o.dict);
    }
  }

  if (seen.size === 0) return;

  const all = Array.from(ctx.enumerateIndirectObjects());
  for (const [ref] of all) {
    if (!seen.has(ref.toString())) ctx.delete(ref);
  }
}

async function runPass(PL, originalBytes, level, preset, progress) {
  let doc;
  try {
    doc = await PL.PDFDocument.load(originalBytes, { updateMetadata: false });
  } catch (e) {
    if (/encrypt|password/i.test(String((e && e.message) || e)))
      throw new Error('ENCRYPTED');
    throw e;
  }

  const pageCount = doc.getPageCount();
  const ctx = doc.context;
  const N = (k) => PL.PDFName.of(k);

  const images = [];
  const smaskRefs = new Set();
  for (const [ref, obj] of Array.from(ctx.enumerateIndirectObjects())) {
    if (!(obj instanceof PL.PDFRawStream)) continue;
    const sub = obj.dict.lookup(N('Subtype'));
    if (!(sub instanceof PL.PDFName) || sub.decodeText() !== 'Image') continue;
    images.push([ref, obj]);
    const sm = obj.dict.get(N('SMask'));
    if (sm instanceof PL.PDFRef) smaskRefs.add(sm.toString());
  }

  let optimized = 0;
  let done = 0;
  for (const [ref, stream] of images) {
    if (!smaskRefs.has(ref.toString())) {
      try {
        const saved = await recompressImage(PL, doc, ref, stream, level, preset);
        if (saved > 0) optimized++;
      } catch {}
    }
    done++;
    progress(
      (done / images.length) * 0.85,
      `Optimizing images (${done}/${images.length})`
    );
    if (done % 2 === 0) await tick();
  }

  try {
    const infoRef = ctx.trailerInfo.Info;
    const info = infoRef ? ctx.lookup(infoRef) : undefined;
    if (info instanceof PL.PDFDict) {
      for (const key of info.keys()) info.delete(key);
    }
    doc.catalog.delete(N('Metadata'));
  } catch {}

  progress(0.9, 'Cleaning up unused data');
  try {
    dropOrphans(PL, doc);
  } catch {}

  progress(0.95, 'Saving document');
  const bytes = await doc.save({
    useObjectStreams: true,
    addDefaultPage: false,
    updateFieldAppearances: false,
  });

  const check = await PL.PDFDocument.load(bytes, { updateMetadata: false });
  if (check.getPageCount() !== pageCount) throw new Error('VERIFY');

  return { bytes, optimized, totalImages: images.length };
}

const PDFJS_VERSION = '3.11.174';
let pdfjsPromise = null;

function loadPdfJs() {
  if (typeof window === 'undefined')
    return Promise.reject(new Error('PDFJS_LOAD'));
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  if (!pdfjsPromise) {
    pdfjsPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.js`;
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`;
        resolve(window.pdfjsLib);
      };
      script.onerror = () => {
        pdfjsPromise = null;
        reject(new Error('PDFJS_LOAD'));
      };
      document.head.appendChild(script);
    });
  }
  return pdfjsPromise;
}

async function renderLevel(PL, pdf, level, progress) {
  const out = await PL.PDFDocument.create();
  const total = pdf.numPages;
  const { maxCanvasPixels } = getMemoryLimits();

  for (let i = 1; i <= total; i++) {
    const page = await pdf.getPage(i);
    let canvas = null;

    try {
      const base = page.getViewport({ scale: 1 });
      let scale = level.scale;
      if (base.width * base.height * scale * scale > maxCanvasPixels) {
        scale = Math.sqrt(maxCanvasPixels / (base.width * base.height));
      }
      const viewport = page.getViewport({ scale });

      canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.floor(viewport.width));
      canvas.height = Math.max(1, Math.floor(viewport.height));
      const ctx = canvas.getContext('2d', { alpha: false });
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      await page.render({ canvasContext: ctx, viewport }).promise;

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, 'image/jpeg', level.quality)
      );
      if (!blob) throw new Error('RASTER');

      const image = await out.embedJpg(new Uint8Array(await blob.arrayBuffer()));
      const newPage = out.addPage([base.width, base.height]);
      newPage.drawImage(image, {
        x: 0,
        y: 0,
        width: base.width,
        height: base.height,
      });
    } finally {
      if (canvas) {
        canvas.width = 0;
        canvas.height = 0;
      }
      if (page && typeof page.cleanup === 'function') page.cleanup();
    }

    progress(i / total, `Compressing page ${i} of ${total}`);
    await tick();
  }

  return out.save({ useObjectStreams: true });
}

async function rasterCompress(PL, originalBytes, raster, targetBytes, progress) {
  let pdfjsLib;
  try {
    pdfjsLib = await loadPdfJs();
  } catch {
    throw new Error('PDFJS_OFFLINE');
  }

  let pdf;
  try {
    pdf = await pdfjsLib.getDocument({ data: new Uint8Array(originalBytes) })
      .promise;
  } catch (err) {
    if (/password|encrypt/i.test(String((err && err.message) || err))) {
      throw new Error('ENCRYPTED');
    }
    throw err;
  }

  let best = null;
  const { maxRasterPasses } = getMemoryLimits();
  const n = Math.min(raster.levels.length, maxRasterPasses);

  try {
    for (let i = 0; i < n; i++) {
      const bytes = await renderLevel(PL, pdf, raster.levels[i], (f, label) =>
        progress(
          (i + f) / n,
          n > 1 ? `${label} · pass ${i + 1} of ${n}` : label
        )
      );
      if (!best || bytes.length < best.length) best = bytes;
      if (!targetBytes || best.length <= targetBytes) break;
    }
  } finally {
    if (pdf && typeof pdf.destroy === 'function') pdf.destroy();
  }
  return best;
}

export async function compressPdf(
  file,
  presetKey,
  allowRaster = true,
  onProgress = () => {}
) {
  const preset = PRESETS[presetKey] || PRESETS.recommended;
  const PL = await import('pdf-lib');
  const original = new Uint8Array(await file.arrayBuffer());
  const canRaster = allowRaster && Boolean(preset.raster);
  const smartShare = canRaster ? 0.5 : 1;

  let smart = null;
  let smartError = null;
  try {
    const levels = preset.levels;
    for (let i = 0; i < levels.length; i++) {
      const result = await runPass(PL, original, levels[i], preset, (f, label) =>
        onProgress(
          ((i + f) / levels.length) * smartShare,
          levels.length > 1
            ? `${label} · pass ${i + 1} of ${levels.length}`
            : label
        )
      );
      if (!smart || result.bytes.length < smart.bytes.length) smart = result;
      if (!preset.targetBytes || smart.bytes.length <= preset.targetBytes) break;
    }
  } catch (e) {
    if (/ENCRYPTED|password/i.test(String((e && e.message) || e)))
      throw new Error('ENCRYPTED');
    smartError = e;
  }
  if (!smart && !canRaster) throw smartError;

  const smartLen =
    smart && smart.bytes.length < original.length
      ? smart.bytes.length
      : original.length;

  let needRaster = false;
  if (canRaster) {
    if (!smart) {
      needRaster = true;
    } else if (preset.targetBytes) {
      needRaster = smartLen > preset.targetBytes;
    } else {
      const savedRatio = 1 - smartLen / original.length;
      needRaster = savedRatio < (preset.raster.minSaved ?? 0.05);
    }
  }

  let rasterBytes = null;
  if (needRaster) {
    try {
      rasterBytes = await rasterCompress(
        PL,
        original,
        preset.raster,
        preset.targetBytes,
        (f, label) => onProgress(0.5 + f * 0.5, label)
      );
    } catch (e) {
      if (/ENCRYPTED|password/i.test(String((e && e.message) || e)))
        throw new Error('ENCRYPTED');
      if (!smart) throw e;
    }
  }

  const useRaster = Boolean(rasterBytes) && rasterBytes.length < smartLen * 0.9;
  const finalBytes = useRaster
    ? rasterBytes
    : smart && smart.bytes.length < original.length
    ? smart.bytes
    : original;

  if (!finalBytes || finalBytes.length < 100) {
    throw new Error('CORRUPT_OUTPUT');
  }

  const unchanged = finalBytes === original;

  return {
    bytes: finalBytes,
    originalSize: original.length,
    newSize: finalBytes.length,
    unchanged,
    mode: useRaster ? 'raster' : 'smart',
    optimized: smart ? smart.optimized : 0,
    totalImages: smart ? smart.totalImages : 0,
    targetMissed:
      Boolean(preset.targetBytes) && finalBytes.length > preset.targetBytes,
    rasterTried: needRaster,
  };
}

function plainStage(label) {
  if (!label) return '';
  if (label.includes('Optimizing images')) return 'Shrinking photos in your PDF…';
  if (label.includes('Compressing page')) return 'Compressing pages…';
  if (label.includes('Cleaning up')) return 'Cleaning up unused data…';
  if (label.includes('Saving document')) return 'Saving your compressed PDF…';
  if (label.includes('Reading')) return 'Reading your PDF…';
  return label;
}

export default function CompressPdfTool() {
  const [file, setFile] = useState(null);
  const [preset, setPreset] = useState('recommended');
  const [dragOver, setDragOver] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('');
  const [result, setResult] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  const clearResult = useCallback(() => {
    setResult(null);
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setDownloadUrl(null);
  }, [downloadUrl]);

  const preloadEngine = () => {
    import('pdf-lib').catch(() => {});
  };

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;
    const isPdf =
      selectedFile.type === 'application/pdf' ||
      /\.pdf$/i.test(selectedFile.name);
    if (!isPdf) {
      setErrorMessage('Please upload a valid PDF file (.pdf).');
      return;
    }
    if (selectedFile.size > MAX_FILE_BYTES) {
      setErrorMessage(
        'This file exceeds 400 MB. Please split it before processing.'
      );
      return;
    }
    preloadEngine();
    setErrorMessage('');
    clearResult();
    setFile(selectedFile);
  };

  const executeCompression = async (activePreset = preset) => {
    if (!file) return;
    setErrorMessage('');
    clearResult();
    setIsCompressing(true);
    setProgress(2);
    setStage('Reading your PDF…');

    try {
      const res = await compressPdf(
        file,
        activePreset,
        true,
        (fraction, label) => {
          setProgress(Math.round(Math.max(2, Math.min(99, fraction * 100))));
          setStage(plainStage(label));
        }
      );

      const blob = new Blob([res.bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setResult(res);
      setProgress(100);
    } catch (e) {
      const message = String((e && e.message) || e);
      if (message === 'ENCRYPTED') {
        setErrorMessage(
          'This PDF is password-protected. Unlock it first, then try again.'
        );
      } else if (message === 'VERIFY') {
        setErrorMessage(
          'The output did not pass verification. Try Low Compression mode.'
        );
      } else if (message === 'PDFJS_OFFLINE') {
        setErrorMessage(
          'Could not load compression worker. Check your internet connection.'
        );
      } else {
        setErrorMessage(
          'Could not process this file. It may be corrupted or unsupported.'
        );
      }
    } finally {
      setIsCompressing(false);
      setStage('');
    }
  };

  const triggerDownload = () => {
    if (!downloadUrl || !file) return;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `compressed-${file.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetFile = () => {
    clearResult();
    setFile(null);
    setErrorMessage('');
    setProgress(0);
    setStage('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const savedPercent =
    result && result.originalSize > 0 && result.newSize > 0
      ? Math.max(
          0,
          Math.round(
            ((result.originalSize - result.newSize) / result.originalSize) * 100
          )
        )
      : 0;

  return (
    <div
      data-no-ads="true"
      google-anno-skip="true"
      className="w-full max-w-4xl mx-auto text-slate-900"
    >
      {errorMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
          <div className="text-xs sm:text-sm font-medium leading-relaxed">
            {errorMessage}
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="sr-only"
        id="pdf-file-input"
        onChange={(e) => handleFileSelect(e.target.files?.[0])}
      />

      {!file ? (
        /* IDLE UPLOAD WORKBENCH */
        <div className="rounded-3xl border border-slate-200/90 bg-white p-2 sm:p-3 shadow-xs">
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/40 bg-dot-grid px-4 py-8 sm:px-10 sm:py-10">
            <div
              role="button"
              tabIndex={0}
              aria-label="Upload PDF file to compress"
              onClick={() => inputRef.current && inputRef.current.click()}
              onMouseEnter={preloadEngine}
              onFocus={preloadEngine}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  inputRef.current && inputRef.current.click();
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                handleFileSelect(e.dataTransfer.files?.[0]);
              }}
              className={`mx-auto max-w-md rounded-2xl border-2 border-dashed bg-white px-6 py-10 sm:py-12 text-center cursor-pointer transition-all shadow-2xs ${
                dragOver
                  ? 'border-emerald-600 bg-emerald-50/20 scale-[1.01]'
                  : 'border-slate-300 hover:border-slate-400'
              }`}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center">
                <svg className="h-12 w-12" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M12 6H29L38 15V40C38 41.1046 37.1046 42 36 42H12C10.8954 42 10 41.1046 10 40V8C10 6.89543 10.8954 6 12 6Z"
                    fill="#ffffff"
                    stroke="#0f172a"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M29 6V15H38"
                    stroke="#0f172a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="24"
                    cy="29"
                    r="8"
                    fill="#f0fdf4"
                    stroke="#16a34a"
                    strokeWidth="2"
                  />
                  <path
                    d="M24 33V25M24 25L20.5 28.5M24 25L27.5 28.5"
                    stroke="#16a34a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-slate-950">
                {dragOver ? 'Drop your PDF here' : 'Drag & drop your PDF here'}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                or click to browse files
              </p>

              <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-medium text-slate-600 shadow-2xs">
                <Lock className="h-3 w-3 text-slate-500" />
                <span>Your files are private and secure</span>
              </div>
            </div>

            {/* Preset picker: one clear choice, stacked on mobile */}
            <p className="mx-auto mt-7 max-w-xl text-center text-xs font-semibold text-slate-800">
              What do you need it for? You can change this later.
            </p>
            <div
              role="radiogroup"
              aria-label="Compression level"
              className="mx-auto mt-3 max-w-xl grid grid-cols-1 sm:grid-cols-3 rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden divide-y sm:divide-x divide-slate-200"
            >
              {Object.entries(PRESETS).map(([key, opt]) => {
                const isActive = preset === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    onClick={() => setPreset(key)}
                    className={`relative px-2 py-3.5 sm:px-4 sm:py-4 text-center transition-all flex flex-col items-center justify-center ${
                      isActive
                        ? 'bg-emerald-50/40 ring-1 ring-inset ring-emerald-500 z-10'
                        : 'bg-white hover:bg-slate-50/80'
                    }`}
                  >
                    {opt.featured && (
                      <Star
                        className={`h-3.5 w-3.5 mb-0.5 ${
                          isActive
                            ? 'fill-emerald-600 text-emerald-600'
                            : 'fill-slate-400 text-slate-400'
                        }`}
                      />
                    )}
                    <span
                      className={`block font-bold text-xs sm:text-[13px] ${
                        isActive ? 'text-emerald-700' : 'text-slate-900'
                      }`}
                    >
                      {opt.shortLabel}
                    </span>
                    <span className="block text-[11px] text-slate-500 mt-0.5">
                      {opt.subLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* ACTIVE FILE & RESULTS DASHBOARD */
        <div className="rounded-3xl border border-slate-200/90 bg-slate-50/70 p-2 sm:p-3 shadow-xs">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-8 space-y-5">
            {/* Top File Row with Red PDF Document Logo */}
            <div className="rounded-2xl border border-slate-200/90 bg-white px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5 min-w-0">
                <PdfDocumentIcon className="w-10 h-12 sm:w-11 sm:h-13 shrink-0" />
                <div className="min-w-0">
                  <h2 className="text-sm sm:text-base font-bold text-slate-950 truncate max-w-[180px] sm:max-w-md">
                    {file.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 tabular-nums mt-0.5">
                    {formatBytes(file.size)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={resetFile}
                disabled={isCompressing}
                className="inline-flex items-center gap-1.5 min-h-[38px] px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 hover:text-slate-950 transition-colors disabled:opacity-50 shrink-0 shadow-2xs"
              >
                <Pencil className="w-3.5 h-3.5 text-slate-500" />
                <span>Change file</span>
              </button>
            </div>

            {/* 3 Radio Preset Cards */}
            <div
              role="radiogroup"
              aria-label="Compression level"
              className="grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              {Object.entries(PRESETS).map(([key, opt]) => {
                const isActive = preset === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    disabled={isCompressing}
                    onClick={() => {
                      if (key === preset) return;
                      setPreset(key);
                      if (result) executeCompression(key);
                    }}
                    className={`rounded-2xl p-4 text-left transition-all flex items-start gap-3 ${
                      isActive
                        ? 'border-2 border-slate-900 bg-white shadow-2xs'
                        : 'border border-slate-200/90 bg-white hover:border-slate-300'
                    } ${isCompressing ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    {/* Custom Radio Circle */}
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        isActive
                          ? 'border-slate-900 bg-slate-900'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </span>

                    <div className="min-w-0">
                      <span className="block font-bold text-xs sm:text-sm text-slate-950">
                        {opt.label}
                      </span>
                      <span className="block text-xs text-slate-500 mt-0.5">
                        {opt.subLabel}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Progress Bar */}
            {isCompressing && (
              <div
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-live="polite"
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                    <p className="text-xs font-medium text-slate-700">{stage}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-900 tabular-nums">
                    {progress}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-emerald-600 transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Before / After / Saved Telemetry Box */}
            {result && (
              <div className="space-y-3">
                <div className="rounded-2xl border border-slate-200/90 bg-white px-5 py-4 sm:px-7 sm:py-5">
                  <div className="grid grid-cols-3 divide-x divide-slate-200/90 items-center">
                    <div className="pr-3 sm:pr-6">
                      <span className="text-xs text-slate-500 block mb-1">
                        Before
                      </span>
                      <strong className="text-base sm:text-2xl font-mono font-bold text-slate-950 tabular-nums">
                        {formatBytes(result.originalSize)}
                      </strong>
                    </div>

                    <div className="px-3 sm:px-6">
                      <span className="text-xs text-slate-500 block mb-1">
                        After
                      </span>
                      <strong className="text-base sm:text-2xl font-mono font-bold text-emerald-600 tabular-nums">
                        {formatBytes(result.newSize)}
                      </strong>
                    </div>

                    <div className="pl-3 sm:pl-6">
                      <span className="text-xs text-slate-500 block mb-1">
                        Saved
                      </span>
                      <span className="inline-block rounded-lg bg-emerald-50 border border-emerald-200/90 px-2.5 py-1 text-xs sm:text-sm font-bold text-emerald-700 tabular-nums">
                        {result.unchanged ? 'No further saving' : `-${savedPercent}% saved`}
                      </span>
                    </div>
                  </div>
                </div>

                {result.targetMissed && (
                  <div className="flex items-start gap-2 text-xs text-amber-900 bg-amber-50 border border-amber-200/80 p-3 rounded-xl">
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Still over 200KB. Remove blank or duplicate pages, upload only the pages the portal asked for, or rescan in grayscale — then compress again.
                    </p>
                  </div>
                )}

                {result.mode === 'raster' && (
                  <div className="flex items-start gap-2 text-xs text-amber-900 bg-amber-50 border border-amber-200/80 p-3 rounded-xl">
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Pages were converted to optimized images to reach this size. Text looks sharp on screen, but can no longer be highlighted.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Next step: context-aware preset suggestion */}
            {result && !result.unchanged && preset !== 'extreme' && (
              <p className="text-center text-xs text-slate-500">
                {preset === 'low'
                  ? 'Need a smaller file? Try Recommended or Extreme.'
                  : 'Need it under 200KB? Try Extreme. Want higher print quality? Try Low.'}
              </p>
            )}

            {/* Primary Action Buttons */}
            {result && downloadUrl ? (
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
                <button
                  type="button"
                  onClick={triggerDownload}
                  className="sm:col-span-7 min-h-[50px] py-3.5 px-5 rounded-xl font-bold text-white text-sm sm:text-base bg-emerald-600 hover:bg-emerald-700 shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF ({formatBytes(result.newSize)})</span>
                </button>

                <button
                  type="button"
                  onClick={resetFile}
                  className="sm:col-span-5 min-h-[50px] py-3.5 px-5 rounded-xl font-bold text-slate-900 text-sm sm:text-base bg-white border border-slate-200/90 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4 text-slate-700" />
                  <span>Compress Another</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => executeCompression()}
                disabled={isCompressing}
                className={`w-full min-h-[50px] py-3.5 px-5 rounded-xl font-bold text-white text-sm sm:text-base transition-all shadow-xs ${
                  isCompressing
                    ? 'bg-slate-400 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                {isCompressing ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Compressing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Compress PDF <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>
            )}

            {/* Bottom Assurance Line Inside Dashboard */}
            <p className="pt-1 flex items-center justify-center gap-1.5 text-xs text-slate-500 text-center">
              <ShieldCheck className="h-4 w-4 text-slate-400 shrink-0" />
              <span>
                Processed right in your browser. Your files are never uploaded to any server.
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}