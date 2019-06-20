'use strict';

const { spawn } = require('child_process');

spawn('ng', ['serve', '--open', '--prod', '--port=4300'], { shell: true, stdio: 'inherit' });
spawn('node', ['build.watch.js'], { stdio: 'inherit' });