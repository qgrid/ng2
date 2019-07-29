export class AnimationModel {
	constructor() {
		this.apply = (memo, context, next) => {
			console.log(`hello from animation model`);
			next(memo);
			return;
		};
	}
}