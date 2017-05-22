export function download(name, data, mimeType) {
	const blob = new Blob([data], {type: mimeType});
	const downloadLink = document.createElement('a');
	const body = document.body;
	const type = mimeType.split('/')[1];
	downloadLink.download = `${name}.${type}`;
	downloadLink.href = window.URL.createObjectURL(blob);
	downloadLink.style.display = 'none';
	body.appendChild(downloadLink);
	downloadLink.click();
	body.removeChild(downloadLink);
}