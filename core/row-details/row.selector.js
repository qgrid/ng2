export function rowSelector(model, markup) {
	return (item) => {
		const rows = model.view().rows;
		const index = rows.indexOf(item);

		if (index > -1 && markup.body.rows[index * 2 + 1]) {
			return markup.body.rows[index * 2 + 1];
		}

		return null;
	};
};