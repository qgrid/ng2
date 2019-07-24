import { Pipe } from '../pipe/pipe';
import { noop } from '../utility/kit';

export class AnimationModel {
	constructor(memo, context, next) {
		this.memo = memo;
		this.context = context;
		this.next = typeof(next) === 'function' ? next : noop;
	}

	apply(memo, context, next) {
		console.log('hello from apply aniation model');
		if (typeof(next) === 'function') {
			next();
		}
	}
}