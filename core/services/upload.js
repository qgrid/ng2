function upload(element) {
	const doc = element.ownerDocument;
	const input = doc.createElement('input');
	input.type = 'file';
	input.style.display = 'none';
	element.appendChild(input);
	input.click();
}

export {
	upload
};