export function build(style) {
	return buildLines(style).join('\n');
}

export function buildLines(style) {
	return Object
		.keys(style)
		.reduce((memo, key) => {
			const entry = style[key];
			const body = Object
				.keys(entry)
				.reduce((memo, key) => {
					memo.push(`\t${key}:${entry[key]} !important;`);
					return memo;
				}, []);

			memo.push(`${key}{\n${body.join('\n')}\n}`);
			return memo;
		}, []);
}