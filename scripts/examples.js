const path = require('path');
const fs = require('fs');
const os = require('os');
const shell = require('shelljs');
const commandLineArgs = require('command-line-args');

const args = commandLineArgs([{
	name: 'version',
	alias: 'v',
	type: String,
	defaultOption: true,
	defaultValue: 'latest'
}]);
const version = args['version'];
const examplesPath = path.join(__dirname, '../src/examples');
const examplesBucketPath = path.join(__dirname, '../../examples-bucket');
const examplesBucketRepoUrl = 'https://github.com/titovmx/examples.git';

const cpCommandFactory = getCopyCommandFactory(examplesPath, examplesBucketPath);
const rmCommand = getRemoveCommand(examplesBucketPath);
shell.exec(rmCommand);
shell.exec(`git clone ${examplesBucketRepoUrl} ${examplesBucketPath}`);
shell.cd(examplesBucketPath);

const files = fs.readdirSync(examplesPath);
files.forEach(file => {
	const stats = fs.lstatSync(path.join(examplesPath, file));
	if (!stats.isDirectory()) {
		return;
	}
	const exampleName = `${file}-${version}`;
	// checkout to master
	shell.exec(`git checkout master`);
	// remove branch for this example if it exists
	shell.exec(`git push -d origin ${exampleName}`);
	shell.exec(`git branch -D ${exampleName}`);
	// checkout to new branch
	shell.exec(`git checkout -b ${exampleName}`);
	// copy files from example to folder
	const cpCommand = cpCommandFactory(file);
	shell.exec(cpCommand);
	// add files and commit
	shell.exec('git add -A');
	shell.exec(`git commit -m "load example ${exampleName}"`);
	// push branch to remote
	shell.exec(`git push -u origin ${exampleName}`);
});

shell.cd(__dirname);
shell.exec(rmCommand);

console.log('All examples have been successfully loaded');

function getRemoveCommand(path) {
	const osType = os.type();
	if (osType === 'Linux' || osType === 'Darwin') {
		return `rm -Rf ${path}`;
	} else if (osType === 'Windows_NT') {
		return `rd /s /q ${path}`;
	} else {
		throw Error(`Unknown OS type: ${osType}`);
	}
}

function getCopyCommandFactory(source, destination) {
	const osType = os.type();
	let cmdStr = null;
	if (osType === 'Linux' || osType === 'Darwin') {
		cmdStr = 'cp -r';
	} else if (osType === 'Windows_NT') {
		cmdStr = 'copy';
	} else {
		throw Error(`Unknown OS type: ${osType}`);
	}
	return dir => {
		return `${cmdStr} ${source}/${dir}/* ${destination}`;
	};
}
