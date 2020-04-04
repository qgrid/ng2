export function downloadFactory(fileSaver) {
	return function download(name, data, mimeType, extension) {
		const blob = new Blob([data], {type: mimeType});
		const type = extension ? extension : mimeType.split('/')[1];
		const fileName = `${name}.${type}`;
		fileSaver.saveAs(blob, fileName);
	};
}