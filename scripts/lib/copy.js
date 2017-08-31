const fs = require('fs');
const path = require('path');

function copy(src, dst) {
	fs.stat(src, (err, stats) => stats.isDirectory()
		? copyDir(src, dst)
		: copyFile(src, dst));
}

function copyDir(src, dst) {
	const dstPath = path.join(dst, path.basename(src));

	fs.mkdir(dstPath, (err) =>
		fs.readdir(src, (err, files) =>
			files.forEach(file =>
				copy(path.join(src, file), dstPath))));
}

function copyFile(src, dst) {
	fs.createReadStream(src)
		.pipe(fs.createWriteStream(path.join(dst, path.basename(src))));
}

module.exports = copy;
