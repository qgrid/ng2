const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const cmdArgs = require('command-line-args');
const package = require('./package.json');
const { relativeCopySync } = require('./build.kit');

const args = cmdArgs([{
	name: 'version',
	alias: 'v',
	type: String,
	defaultValue: 'latest'
}, {
	name: 'pattern',
	alias: 'p',
	type: String,
	defaultValue: ''
}, {
	name: 'silent',
	alias: 's',
	type: Boolean,
	defaultValue: false
}]);

const { version, silent, pattern } = args;
const rootPath = path.resolve('.');
const examplesPath = path.join(rootPath, './src/examples');
const repoPath = path.join(rootPath, '../ng2-example');
const repoUrl = 'https://github.com/qgrid/ng2-example.git';

console.log(`------CLONE ${repoUrl}------`);
const rmParams = ['-rf', repoPath];
shell.rm(...rmParams);
shell.exec(`git clone ${repoUrl} ${repoPath}`);
shell.cd(repoPath);

console.log(`------UPD PACKAGE/${package.version}------`);
// add dependency to ng2-qgrid
shell.exec(`npm i ng2-qgrid@${package.version} --save`, { silent });

console.log('------UPD MASTER------');
shell.exec(`git add package.json`, { silent });
shell.exec(`git commit -m "ng2-qgrid/${package.version}"`, { silent });

// remove node_modules
shell.exec(`git clean -fd`, { silent });
shell.exec(`git push`, { silent });

console.log(`------READ ${examplesPath}/${pattern}------`);
const examples = fs
	.readdirSync(examplesPath)
	.filter(dir => dir.includes(pattern));

examples.forEach(example => {
	const examplePath = path.join(examplesPath, example);
	const stats = fs.lstatSync(examplePath);
	if (!stats.isDirectory() || fs.readdirSync(examplePath).length === 0) {
		return;
	}

	const branch = `${example}/${version}`;
	console.log(`------${branch.toUpperCase()}------`);

	shell.exec(`git checkout master`, { silent });

	// remove branch for this example if it exists
	shell.exec(`git push -d origin ${branch}`, { silent });
	shell.exec(`git branch -D ${branch}`, { silent });
	shell.exec(`git checkout -b ${branch}`, { silent });

	// copy files from example to bucket
	const src = `${examplesPath}/${example}`;
	const dst = `${repoPath}/src/app`;
	console.log(src);
	console.log(dst);
	const rename = file => {
		const ext = path.extname(file);
		const baseName = path.basename(file, ext);
		console.log(baseName);
		if (baseName === `example-${example}.component`) {
			return path.join(path.dirname(file), `app.component${ext}`);
		}
		return file;
	};

	relativeCopySync('**/*', src, dst, rename);

	shell.exec('git add -A');
	shell.exec(`git commit -m "example/${branch}"`, { silent });
	shell.exec(`git push -u origin ${branch}`, { silent });
});

shell.cd(__dirname);
shell.rm(...rmParams);
