'use strict';

const { buildTheme, serveApp, watchTheme } = require('./build.kit');
const {
	clearDists,
	execute,
	sleep,
	watchForBuild,
} = require('./build.kit2');

async function main() {
	await clearDists();

	execute('cd packages/qgrid-core && rollup -c -w');

	await watchQgridCore();
	await watchQgridPlugins();
	await watchNgxQgrid();
	await watchNgxQgridPlugins();
	await watchNg2Qgrid();
	await watchNg2QgridThemeBasic();
	await watchNg2QgridThemeMaterial();
}

main();

async function watchQgridCore() {
	await watchForBuild('qgrid-core').then(() => {
		execute('cd packages/qgrid-plugins && rollup -c -w');
	});
}

async function watchQgridPlugins() {
	await watchForBuild('qgrid-plugins').then(() => {
		execute('cd packages/ngx-qgrid && ng', ['build', '--watch']);
	});
}

async function watchNgxQgrid() {
	await watchForBuild('ngx-qgrid').then(() => {
		execute('cd packages/ngx-qgrid-plugins && ng', ['build', '--watch']);
	});
}

async function watchNgxQgridPlugins() {
	await watchForBuild('ngx-qgrid-plugins').then(() => {
		execute('cd packages/ng2-qgrid && ng', ['build', '--watch'])
	});
}

async function watchNg2Qgrid() {
	await watchForBuild('ng2-qgrid').then(async () => {
		buildTheme('ng2-qgrid-theme-basic');
		await sleep(1000);
		execute('cd packages/ng2-qgrid-theme-basic && ng', ['build', '--watch']);
		watchTheme('ng2-qgrid-theme-basic');
	});
}

async function watchNg2QgridThemeBasic() {
	await watchForBuild('ng2-qgrid-theme-basic').then(async () => {
		buildTheme('ng2-qgrid-theme-material');
		await sleep(1000);
		execute('cd packages/ng2-qgrid-theme-material && ng', ['build', '--watch']);
		watchTheme('ng2-qgrid-theme-material');
	});
}

async function watchNg2QgridThemeMaterial() {
	await watchForBuild('ng2-qgrid-theme-material').then(() => {
		serveApp();
	});
}
