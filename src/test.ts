// This file is required by karma.conf.js and loads recursively all the .spec files
export {};

declare const require: any;

const context = require.context('./', true, /\.spec\.[tj]s$/);
context.keys().map(context);
