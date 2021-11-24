export function animationPipe(memo, context, next) {
	const { model } = context;
	const { apply } = model.animation();
	let { length } = apply;
	if (length) {
		const doNext = () => {
			length--;
			if (length === 0) {
				next(memo);
			}
		};

		apply.forEach(animation => {
			animation(memo, context, doNext);
		});
	} else {
		next(memo);
	}
}