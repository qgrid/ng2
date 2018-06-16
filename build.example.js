const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const cmdArgs = require('command-line-args');
const package = require('../package.json');
const { relativeCopy } = require('./build.lib');

const args = cmdArgs([{
	name: 'version',
	alias: 'v',
	type: String,
	defaultOption: true,
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
const exampleVersion = version || package.version;
const repoPath = path.join(rootPath, '../ng2-example');
const repoUrl = 'https://github.com/qgrid/ng2-example.git';

const rmParams = ['-rf', repoPath];
shell.rm(...rmParams);
shell.exec(`git clone ${repoUrl} ${repoPath}`);
shell.cd(repoPath);

// add dependency to ng2-qgrid
shell.exec(`npm i ng2-qgrid@${exampleVersion} --save`, { silent });
shell.exec(`git add package.json`, { silent });
shell.exec(`git commit -m "ng2-qgrid/${exampleVersion}"`, { silent });

// remove node_modules
shell.exec(`git clean -fd`, { silent });
shell.exec(`git push`, { silent });

const examples = fs
	.readdirSync(examplesPath)
	.filter(file => file.includes(pattern));

examples.forEach(example => {
	const examplePath = path.join(examplesPath, example);
	const stats = fs.lstatSync(examplePath);
	if (!stats.isDirectory() || fs.readdirSync(examplePath).length === 0) {
		return;
	}

	const branch = `${example}-${version}`;
	console.log(`branch: ${branch}`);

	shell.exec(`git checkout master`, { silent });

	// remove branch for this example if it exists
	shell.exec(`git push -d origin ${branch}`, { silent });
	shell.exec(`git branch -D ${branch}`, { silent });
	shell.exec(`git checkout -b ${branch}`, { silent });

	// copy files from example to bucket
	const src = `${examplesPath}/${example}/*`;
	const dst = `${repoPath}/src/example`;
	const rename = pth => {
		console.log(pth);
		return pth;	
	};

	relativeCopy('**/*', src, dst, rename);

	shell.exec('git add -A');
	shell.exec(`git commit -m "example/${branch}"`, { silent });
	shell.exec(`git push -u origin ${branch}`, { silent });
});

shell.cd(__dirname);
shell.rm(...rmParams);
