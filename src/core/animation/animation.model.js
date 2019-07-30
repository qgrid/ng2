export class AnimationModel {
	constructor() {
		this.apply = (memo, context, next) => {
			next(memo);
			return;
		};
	}
}