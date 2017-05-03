const fs = require('fs');
const path = require('path');
const ghpages = require('gh-pages');

function exists(path) {
	try {
		return fs.statSync(path).isFile();
	}
	catch (ex) {
		return false;
	}
}

function main() {
	const dir = path.resolve(path.join(__dirname, '..', 'demo'));
	const entry = path.join(dir, 'dist', 'demo.js');
	if (!exists(entry)) {
		throw new Error(`publish: ${entry} is not exists, check build status`);
	}

	ghpages.publish(dir, {
		user: {
			name: 'qgrid',
			email: 'qgrid.team@gmail.com'
		},
		message: '(deploy): CI',
		logger: function (message) {
			console.log('gh-pages: ', message);
		}
	});
}

main();