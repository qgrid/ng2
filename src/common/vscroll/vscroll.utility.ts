export function capitalize(text: string) {
	return text[0].toUpperCase() + text.slice(1);
}

export function placeholderBitmap(width: number, height: number) {
	const minWidth = Math.max(width, 1);
	const minHeight = Math.max(height, 1);
	const canvas = document.createElement('canvas');
	canvas.width = Math.max(width * 2, 1);
	canvas.height = Math.max(height * 2, 1);

	const ctx = canvas.getContext('2d');
	ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
	ctx.fillRect(0, 0, minWidth, minHeight);
	ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
	ctx.fillRect(width, height, minWidth, minHeight);

	return canvas.toDataURL();
}
