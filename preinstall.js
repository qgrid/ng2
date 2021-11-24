'use strict';

const path = require('path');
const { relativeCopy } = require('./build.utils');

relativeCopy('package.json',
  path.join('packages', 'ngx-qgrid'),
  path.join('dist', 'ngx-qgrid')
);

relativeCopy('package.json',
  path.join('packages', 'ngx-qgrid-plugins'),
  path.join('dist', 'ngx-qgrid-plugins')
);
