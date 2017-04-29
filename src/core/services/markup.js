export function build(style) {
	return Object
		.keys(style)
		.reduce((memo, key) => {
			const entry = style[key];
			const body = Object
				.keys(entry)
				.reduce((memo, key) => {
					memo.push(`${key}:${entry[key]} !important;`);
					return memo;
				}, []);

			memo.push(`${key}{${body.join('')}}`);
			return memo;
		}, [])
		.join('');
}
