'use strict';

const { spawn } = require('child_process');

spawn('ng', ['serve', '--open', '--port 4500'], { shell: true, stdio: 'inherit' });
spawn('node', ['build.watch.js'], { stdio: 'inherit' });