'use strict';

const { 
	execute,
	sleep,
	watchForBuild,
  buildTheme,
  serveApp,
  watchTheme,
} = require('./build.kit');
const cmdArgs = require('command-line-args');

const { prod } = cmdArgs([{
  name: 'prod',
  type: Boolean,
  defaultValue: false
}]);

const serveOptions = [];
if (prod) {
  serveOptions.push('--prod');
}

async function main() {
	await buildAndWatch('qgrid-core');
	await buildAndWatch('qgrid-plugins');
	await buildAndWatch('ngx-qgrid');
	await buildAndWatch('ngx-qgrid-plugins');
	await buildAndWatch('ng2-qgrid');
	await buildAndWatch('ng2-qgrid-theme-basic');
	await buildAndWatch('ng2-qgrid-theme-material');
	await buildAndWatch('ng2-qgrid-app');
}

async function buildAndWatch(project) {
	await buildProject(project);
	await watchForBuild(project);
}

async function buildProject(project) {
	switch (project) {
		case 'qgrid-core': {
			execute('cd packages/qgrid-core && rollup -c -w');
			return;
		}
		case 'qgrid-plugins': {
			execute('cd packages/qgrid-plugins && rollup -c -w');
			return;
		}
		case 'ngx-qgrid': {
			execute('cd packages/ngx-qgrid && ng', ['build', '--watch']);
			return;
		}
		case 'ngx-qgrid-plugins': {
			execute('cd packages/ngx-qgrid-plugins && ng', ['build', '--watch']);
			return;
		}
		case 'ng2-qgrid': {
			execute('cd packages/ng2-qgrid && ng', ['build', '--watch']);
			return;
		}
		case 'ng2-qgrid-theme-basic': {
			buildTheme('ng2-qgrid-theme-basic');
			await sleep(1000);
			execute('cd packages/ng2-qgrid-theme-basic && ng', ['build', '--watch']);
			watchTheme('ng2-qgrid-theme-basic');
			return;
		}
		case 'ng2-qgrid-theme-material': {
			buildTheme('ng2-qgrid-theme-material');
			await sleep(1000);
			execute('cd packages/ng2-qgrid-theme-material && ng', ['build', '--watch']);
			watchTheme('ng2-qgrid-theme-material');
			return;
		}
		case 'ng2-qgrid-app': {
			serveApp(serveOptions);
			return;
		}
	
		default: {
			console.log('Nothing to build');
			return;
		}
	}
}

main();
