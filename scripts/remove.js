const fs = require('fs');

function exists(path) {
	try {
		return fs.statSync(path).isDirectory();
	}
	catch (ex) {
		return false;
	}
}

function remove(path) {
	if (exists(path)) {
		fs.readdirSync(path).forEach(function (file) {
			const curPath = path + "/" + file;
			if (fs.lstatSync(curPath).isDirectory()) {
				remove(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};


function main(args) {
	remove(args[0]);
}

main(process.argv.splice(2));