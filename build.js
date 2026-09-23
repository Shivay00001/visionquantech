const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

fs.mkdirSync('dist', { recursive: true });
fs.mkdirSync('.build', { recursive: true });
fs.copyFileSync('website', '.build/website.jsx');

esbuild.buildSync({
  entryPoints: ['entry.jsx'],
  alias: {},
  bundle: true,
  minify: true,
  outfile: 'dist/bundle.js',
  format: 'iife',
  loader: { '.js': 'jsx' },
});

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>VisionQuantech — Quantum Vision Web Platform</title>
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
<div id="root"></div>
<script src="./bundle.js"></script>
</body>
</html>`;

fs.writeFileSync(path.join('dist', 'index.html'), html);
console.log('build complete: dist/index.html + dist/bundle.js');
