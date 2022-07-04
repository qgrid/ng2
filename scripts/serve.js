/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const {
  execute,
  sleep,
  watchForBuild,
  buildTheme,
  serveApp,
  watchTheme,
  watchStyles,
} = require('./build.kit');

const cmdArgs = require('command-line-args');

const { prod } = cmdArgs(
  [
    {
      name: 'prod',
      type: Boolean,
      defaultValue: false,
    },
  ]);

const serveOptions = [];
if (prod) {
  serveOptions.push('--prod');
}

async function main() {
  await buildAndWatch('qgrid-core');
  await buildAndWatch('qgrid-plugins');
  await buildAndWatch('qgrid-ngx');
  await buildAndWatch('qgrid-ngx-plugins');
  await buildAndWatch('ng2-qgrid');
  await buildAndWatch('qgrid-ngx-theme-basic');
  await buildAndWatch('qgrid-ngx-theme-material');
  await buildAndWatch('qgrid-styles');
  await buildAndWatch('qgrid-ngx-examples');
}

async function buildAndWatch(project) {
  await buildProject(project);
  if (project !== 'qgrid-styles') {
    await watchForBuild(project);
  }
}

async function buildProject(project) {
  switch (project) {
    case 'qgrid-core':
    case 'qgrid-plugins':
    case 'qgrid-ngx':
    case 'qgrid-ngx-plugins':
    case 'ng2-qgrid': {
      execute(`cd packages/${project} && yarn build:watch`);
      return;
    }
    case 'qgrid-ngx-theme-basic':
    case 'qgrid-ngx-theme-material': {
      buildTheme(project);
      await sleep(1000);
      execute(`cd packages/${project} && yarn build:watch`);
      watchTheme(project);
      return;
    }
    case 'qgrid-ngx-examples': {
      serveApp(serveOptions);
      return;
    }
    case 'qgrid-styles': {
      watchStyles('qgrid-styles');
      return;
    }

    default: {
      console.log('Nothing to build');
      return;
    }
  }
}

main();
