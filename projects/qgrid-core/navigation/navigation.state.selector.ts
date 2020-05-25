
export function selectRow(state) {
	const { cell } = state;
	if (cell) {
		return cell.row;
	}

	return null;
}

export function selectColumn(state) {
	const { cell } = state;
	if (cell) {
		return cell.column;
	}

	return null;
}

export function selectColumnIndex(state) {
	const { cell } = state;
	if (cell) {
		return cell.columnIndex;
	}

	return -1;
}

export function selectRowIndex(state) {
	const { cell } = state;
	if (cell) {
		return cell.rowIndex;
	}

	return -1;
}

