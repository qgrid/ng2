'use strict';

const sane = require('sane');
const { spawn } = require('child_process');

const SPAWN_OPTS = { shell: true, stdio: 'inherit' };

function execute(command, options = []) {
	const resultOptions = [];
	resultOptions.push(...options);

	spawn(
		command,
		resultOptions,
		SPAWN_OPTS
	);
}

async function watchForBuild(projectFolderForWatch) {
	return new Promise((resolve, _reject) => {
		const dirPathForWatch = `packages/${projectFolderForWatch}`;
		const fileForWatch = 'dist\\public-api.d.ts';

		sane(dirPathForWatch)
			.on('all', (_eventType, fileName) => {
				if (fileName === fileForWatch) {
					resolve();
				}
			});
	});
}

async function clearDists() {
	const removeCommand = 'rmdir /q /s dist';

	execute(`cd packages/qgrid-core && ${removeCommand}`);
	execute(`cd packages/qgrid-plugins && ${removeCommand}`);
	execute(`cd packages/ngx-qgrid && ${removeCommand}`);
	execute(`cd packages/ngx-qgrid-plugins && ${removeCommand}`);
	execute(`cd packages/ng2-qgrid && ${removeCommand}`);
	execute(`cd packages/ng2-qgrid-theme-basic && ${removeCommand}`);
	execute(`cd packages/ng2-qgrid-theme-material && ${removeCommand}`);
	execute(`cd packages/ng2-qgrid-app && ${removeCommand}`);

	await sleep(2000);

	return Promise.resolve();
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
	clearDists,
	execute,
	sleep,
	watchForBuild,
};