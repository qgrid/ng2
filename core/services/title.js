function firstRowTitle(index, row) {
	return row[index];
}
function numericTitle(index) {
	return index;
}
function alphaTitle(index) {
	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	if (index < alphabet.length) {
		return alphabet[index];
	} else {
		const indexFirst = Math.floor(index / alphabet.length - 1);
		const indexSecond = index % alphabet.length;
		return `${alphabet[indexFirst]}${alphabet[indexSecond]}`;
	}
}

export {
	firstRowTitle,
	numericTitle,
	alphaTitle
};