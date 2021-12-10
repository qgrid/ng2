'use strict';

const { buildTheme, serveApp, watchTheme } = require('./build.kit');
const {
	clearDists,
	execute,
	watchForBuild,
} = require('./build.kit2');

function main() {
	clearDists();

	execute('cd packages/qgrid-core && rollup -c -w');

	watchForBuild('qgrid-core', () => execute('cd packages/qgrid-plugins && rollup -c -w'));

	watchForBuild('qgrid-plugins', () => execute('cd packages/ngx-qgrid && ng', ['build', '--watch']));

	watchForBuild('ngx-qgrid', () => execute('cd packages/ngx-qgrid-plugins && ng', ['build', '--watch']));

	watchForBuild('ngx-qgrid-plugins', () => execute('cd packages/ng2-qgrid && ng', ['build', '--watch']));

	watchForBuild('ng2-qgrid', () => {
		buildTheme('ng2-qgrid-theme-basic');
		buildTheme('ng2-qgrid-theme-material');

		execute('cd packages/ng2-qgrid-theme-basic && ng', ['build', '--watch']);
		execute('cd packages/ng2-qgrid-theme-material && ng', ['build', '--watch']);

		watchTheme('ng2-qgrid-theme-basic');
		watchTheme('ng2-qgrid-theme-material');
	});

	watchForBuild('ng2-qgrid-theme-material', () => {
		console.log("START SERVING APP");
		serveApp();
	});
}

main();