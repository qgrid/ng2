const path = require('path');
const copy = require('./lib/copy');

function main() {
	const cwd = process.cwd();
	const src = process.argv[2];
	const dst = process.argv[3];

	copy(path.join(cwd, src), path.join(cwd, dst));
}

main();

module.exports = main;
