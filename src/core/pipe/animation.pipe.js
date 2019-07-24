export function animationPipe(rows, context, next) {
	const { model } = context;
	const { apply } = model.animation();
	// apply();
	console.log('hello from animation pipe');
	console.log(model);
	console.log(next);
	console.log(rows);
	console.log(context);
	next(rows);
}