'use strict';

const { spawn } = require('child_process');

const processes = [
  spawn('ng', ['serve', '--open'], { shell: true, stdio: 'inherit' }),
  spawn('node', ['build.watch.js'], { stdio: 'inherit' })
];
