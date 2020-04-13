export function animationPipe(memo, context, next) {
	const { apply } = context.model.animation();
	let { length } = apply;
	if (length) {
		const complete = () => {
			length--;
			if (length === 0) {
				next(memo);
			}
		};

		apply.forEach(animation => {
			animation(memo, context, complete);
		});
	} else {
		next(memo);
	}
}