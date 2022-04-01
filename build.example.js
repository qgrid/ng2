const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const cmdArgs = require('command-line-args');
const package = require('./package.json');
const { relativeCopySync, toComponentName } = require('./build.utils');

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

	const visit = ({ dstPath, content }) => {
		let ext = path.extname(dstPath);
		const baseName = path.basename(dstPath, ext);
		if (baseName === `example-${example}.component`) {
			if (ext === '.scss') {
				ext = '.css';
			}

			dstPath = path.join(path.dirname(dstPath), `app.component${ext}`);

			if (ext === '.ts') {
				content = content
					.replace(`'example-${example}'`, `'my-app'`)
					.replace(`'example-${example}.component.html'`, `'app.component.html'`)
					.replace(`'example-${example}.component.scss'`, `'app.component.css'`)
					.replace(`Example${toComponentName(example)}Component`, 'AppComponent');

				console.log(toComponentName(example));
			}
		}

		return { dstPath, content };
	};

	relativeCopySync('**/*', src, dst, visit);

	shell.exec('git add -A');
	shell.exec(`git commit -m "example/${branch}"`, { silent });
	shell.exec(`git push -u origin ${branch}`, { silent });
});

shell.cd(__dirname);
shell.rm(...rmParams);
