function upload(element) {
	const { ownerDocument } = element;
	const input = ownerDocument.createElement('input');
	input.type = 'file';
	input.style.display = 'none';
	
	element.appendChild(input);
	input.click();
}

export {
	upload
};