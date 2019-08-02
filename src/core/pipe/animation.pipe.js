export function animationPipe(memo, context, next) {
	const { apply } = context.model.animation();
	apply(memo, context, next);
}