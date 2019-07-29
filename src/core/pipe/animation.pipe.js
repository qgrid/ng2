export function animationPipe(memo, context, next) {
	const { apply } = context.model.animation();
	apply(memo, context, next);
	console.log('hello from animation pipe');
}