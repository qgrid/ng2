const path = require('path');
const fs = require('fs');
const os = require('os');
const shell = require('shelljs');
const commandLineArgs = require('command-line-args');
const generateExampleTemplate = require('./generateExampleTemplate');
const generateExampleModule = require('./generateExampleModule');

const args = commandLineArgs([{
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
	defaultValue: true
}]);
const version = args['version'];
const silent = args['silent'];
const projectPath = path.resolve('.');
const examplesPath = path.join(projectPath, './src/examples');
const examplesBucketPath = path.join(projectPath, '../examples-bucket');
const assetsPath = path.join(projectPath, './src/assets');
const examplesBucketRepoUrl = 'https://github.com/titovmx/examples.git';

const rmParams = ['-rf', examplesBucketPath];
shell.rm(...rmParams);
shell.exec(`git clone ${examplesBucketRepoUrl} ${examplesBucketPath}`);
shell.cd(examplesBucketPath);
// add dependency to ng2-qgrid
shell.exec(`npm i ng2-qgrid@${version} --save`, { silent });
shell.exec(`git add package.json`, { silent });
shell.exec(`git commit -m "update version of ng2-qgrid"`, { silent });
// remove node_modules
shell.exec(`git clean -fd`, { silent });
shell.exec(`git push`, { silent });

const examples = fs.readdirSync(examplesPath)
	.filter(file => file.includes(args['pattern']));
examples.forEach(example => {
	const exampleDirPath = path.join(examplesPath, example);
	const stats = fs.lstatSync(exampleDirPath);
	if (!stats.isDirectory() || fs.readdirSync(exampleDirPath).length === 0) {
		return;
	}
	console.log(`Loading ${example}...`);
	const exampleName = `${example}-${version}`;

	shell.exec(`git checkout master`, { silent });
	// remove branch for this example if it exists
	shell.exec(`git push -d origin ${exampleName}`, { silent });
	shell.exec(`git branch -D ${exampleName}`, { silent });
	shell.exec(`git checkout -b ${exampleName}`, { silent });

	const template = generateExampleTemplate(example);
	fs.writeFileSync(path.join(examplesBucketPath, '/src', 'index.html'), template);

	const exampleModule = generateExampleModule(example);
	fs.writeFileSync(path.join(examplesBucketPath, '/src', 'example.module.ts'), exampleModule);
	// copy files from example to bucket
	const source = `${examplesPath}/${example}/*`;
	const dest = `${examplesBucketPath}/src/example`;
	shell.cp('-r', source, dest);
	// copy data service
	const dataServiceContent = fs.readFileSync(`${examplesPath}/data.service.ts`, 'utf8');
	const dataServiceContentWithRawGitLinks = dataServiceContent.replace(new RegExp(`assets/`, 'ig'), `https://rawgit.com/qgrid/ng2/master/src/assets/`);
	fs.writeFileSync(path.join(examplesBucketPath, '/src', 'data.service.ts'), dataServiceContentWithRawGitLinks);

	shell.exec('git add -A');
	shell.exec(`git commit -m "load example ${exampleName}"`, { silent });
	shell.exec(`git push -u origin ${exampleName}`, { silent });
});

shell.cd(__dirname);
shell.rm(...rmParams);

console.log('All examples have been successfully loaded');
