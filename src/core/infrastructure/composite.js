import { Command } from '../command/command';
import { noop } from '../utility/kit';

export class Composite {
	static func(list, reduce = noop, memo = null) {
		return (...args) => {
			for (const f of list) {
				memo = reduce(memo, f(...args));
			}

			return memo;
		};
	}

	static command(list) {
		return new Command({
			source: 'composite',
			canExecute: (...args) => {
				return list.reduce((memo, cmd) => memo || cmd.canExecute(...args), false);
			},
			execute: (...args) => {
				return list
					.filter(cmd => cmd.canExecute(...args))
					.reduce((memo, cmd) => cmd.execute(...args) || memo, undefined);
			}
		});
	}

	static list(list) {
		return list.reduce((memo, xs) => memo.concat(xs), []);
	}

	static object(list, memo = {}) {
		return Object.assign(memo, ...list);
	}
}