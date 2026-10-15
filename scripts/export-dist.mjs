import fs from 'fs';
import path from 'path';

const dist = 'dist';
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

// 1. Copy public/ assets if present
if (fs.existsSync('public')) {
  fs.cpSync('public', dist, { recursive: true });
}

// 2. Copy Next.js static client chunks (_next/static)
const nextStatic = path.join('.next', 'static');
if (fs.existsSync(nextStatic)) {
  fs.cpSync(nextStatic, path.join(dist, '_next', 'static'), { recursive: true });
}

// 3. Copy all prerendered HTML & metadata files (.html, .body, .xml, .txt, .webmanifest)
function copyAppDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyAppDir(srcPath, destPath);
    } else if (entry.name.endsWith('.html')) {
      fs.mkdirSync(destDir, { recursive: true });
      fs.copyFileSync(srcPath, destPath);
    } else if (entry.name.endsWith('.body')) {
      const baseName = entry.name.replace(/\.body$/, '');
      fs.mkdirSync(destDir, { recursive: true });
      fs.copyFileSync(srcPath, path.join(destDir, baseName));
    }
  }
}

copyAppDir(path.join('.next', 'server', 'app'), dist);
console.log('✓ Successfully assembled static output in dist/');
