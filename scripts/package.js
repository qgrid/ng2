const fs = require('fs');
const path = require('path');

const cwd = process.cwd();;
const pkg = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json')));

pkg.peerDependencies = pkg.dependencies;
pkg.dependencies = {};
pkg.devDependencies = {};
pkg.scripts = {};

fs.writeFileSync(path.join(cwd, 'dist', 'package.json'), JSON.stringify(pkg, null, 2));
