'use strict';

const sane = require('sane');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { spawn } = require('child_process');

const ROOT_PATH = path.resolve('.');
const SPAWN_OPTS = { shell: true, stdio: 'inherit' };

function serveApp(options = []) {
	const serveOptions = ['serve', '--open'];
	serveOptions.push(...options);

	console.log(serveOptions);
	spawn(
		'cd packages/qgrid-ngx-examples && ng',
		serveOptions,
		SPAWN_OPTS
	);
}

function buildTheme(name) {
	const libPath = path.join(
		ROOT_PATH,
		'packages',
		name,
		'src',
		'lib'
	);

	const templatesPath = path.join(
		libPath,
		'templates'
	);

	console.log(`build.kit build theme ${templatesPath}`);

	concatFiles({
		path: templatesPath,
		outputPath: path.join(libPath, 'theme.component.gen.html'),
	});
	return;
}

function watchStyles(name) {
	const stylesPath = path.join(
		ROOT_PATH,
		'packages',
		name
	);

	sane(stylesPath)
		.on('all', (eventType, fileName) => {
			if (fileName !== 'index.scss') {
				console.log(`build.kit ${eventType}: ${fileName}`);

				recompileStyles(stylesPath);
			}
		});
}

function watchTheme(name) {
	const libPath = path.join(
		ROOT_PATH,
		'packages',
		name,
		'src',
		'lib'
	);

	const templatesPath = path.join(
		libPath,
		'templates'
	);

	sane(templatesPath)
		.on('all', (eventType, fileName) => {
			console.log(`build.kit ${eventType}: ${fileName}`);

			buildTheme(name);
		});
}

function concatFiles(settings = {}) {
	settings = Object.assign(settings, {
		encoding: 'utf-8',
		pattern: /.*\.tpl\.html/
	});

	const pathes = fs.readdirSync(settings.path);
	const content = pathes
		.filter(file => file.match(settings.pattern))
		.map(file => {
			const p = path.join(settings.path, file);
			console.info(`read: ${p}`);
			return fs.readFileSync(p, { encoding: settings.encoding });
		})
		.join('');

	console.info(`write: ${settings.outputPath}`);

	if (!fs.existsSync(settings.outputPath) || fs.readFileSync(settings.outputPath, { encoding: settings.encoding }) !== content) {
		fs.writeFileSync(settings.outputPath, content);
	}
}

function recompileStyles(stylesPath) {
	const indexPath = path.join(stylesPath, 'index.scss')
	const file = fs.readFileSync(indexPath, 'utf-8');
	fs.writeFileSync(indexPath, file);
}

function execute(command, options = []) {
	spawn(
		command,
		options,
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

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// Copy files maintaining relative paths.
function relativeCopy(fileGlob, from, to) {
	return new Promise((resolve, reject) => {
		glob(fileGlob, { cwd: from, nodir: true }, (err, files) => {
			if (err) {
				reject(err);
			}

			files.forEach(file => {
				const origin = path.join(from, file);
				const dest = path.join(to, file);
				const data = fs.readFileSync(origin, 'utf-8');
				makeFolderTree(path.dirname(dest));
				fs.writeFileSync(dest, data);
				console.log(`copy: from ${origin} to ${dest}`);
			});

			resolve();
		})
	});
}

function relativeCopySync(fileGlob, from, to, visit = x => x) {
	const files = glob.sync(fileGlob, { cwd: from, nodir: true });

	files.forEach(file => {
		const srcPath = path.join(from, file);
		const dstPath = path.join(to, file);
		const content = fs.readFileSync(srcPath, 'utf-8');
		makeFolderTree(path.dirname(dstPath));

		const result = visit({ srcPath, dstPath, content });
		fs.writeFileSync(result.dstPath, result.content);
		console.log(`copy: ${file} -> ${result.dstPath}`);
	});
}

// Recursively create a dir.
function makeFolderTree(dir) {
	if (!fs.existsSync(dir)) {
		makeFolderTree(path.dirname(dir));
		fs.mkdirSync(dir);
	}
}

function toComponentName(name) {
	return name
		.split('-')
		.map(part => part[0].toUpperCase() + part.slice(1))
		.join('');
}


module.exports = {
	execute,
	sleep,
	watchForBuild,
	buildTheme,
	serveApp,
	watchTheme,
	relativeCopy,
	relativeCopySync,
	concatFiles,
	toComponentName,
	watchStyles
};
