const shell = require('shelljs');
const path = require('path');
const fs = require('fs');

const RELEASE_BRANCH = '1.0.x';
const cwd = path.resolve('.');
const pkgPath = path.join(cwd, 'package.json');
const bowerPath = path.join(cwd, 'bower.json');

function main() {
	shell.exec(`git stash`);
	shell.exec(`git checkout ${RELEASE_BRANCH}`);
	shell.exec(`git pull origin master`);

	const version = `v${updateVersion()}`;

	shell.exec(`npm run build:prod`);
	shell.exec(`npm run build:prod:min`);

	shell.exec(`git add ${path.join(cwd, 'dist')}`);
	shell.exec(`git add ${pkgPath}`);
	shell.exec(`git add ${bowerPath}`);
	shell.exec(`git commit -m "Release ${version}"`);
	shell.exec(`git tag ${version}`);

	shell.exec(`git push`);
	shell.exec(`git push origin ${version}`);

	shell.exec(`npm publish`);

	shell.exec('git checkout master');
}

function updateVersion() {
	shell.exec(`npm --no-git-tag-version version patch`);

	const pkg = require(pkgPath);

	// Need to make it because bower version path automatically makes commit and tag
	const bower = require(bowerPath);
	bower.version = pkg.version;
	fs.writeFileSync(bowerPath, JSON.stringify(bower, null, '\t'));

	return pkg.version;
}

main();