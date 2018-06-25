'use strict';
const { relativeCopy } = require('./build.kit');

const args = process.argv;
const pattern = args[2];
const source = args[3];
const target = args[4];

console.log(`copy: ${pattern} from ${source} to ${target}`);

relativeCopy(pattern, source, target);