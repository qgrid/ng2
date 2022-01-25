import { isFunction } from '@qgrid/core';

export function method(inst: any, key: string) {
	const sourceFn = inst[key];

	return {
		with: withFactory(inst, key, sourceFn)
	};
}

export function methodsOf(inst: any) {
	const keys = Object.keys(inst);
	const length = keys.length;
	const patch: any = {};

	for (let i = 0; i < length; i++) {
		const key = keys[i];
		if (isFunction(inst[key])) {
			patch[key] = method(inst, key);
		}
	}

	return {
		with: (...args: any[]) => {
			const patchKeys = Object.keys(patch);
			const patchLength = patchKeys.length;

			for (let i = 0; i < patchLength; i++) {
				const key = patchKeys[i];

				inst.action = key;
				patch[key].with.apply(inst, args);
			}
		}
	};
}

export function withFactory(inst: any, key: any, sourceFn: any) {
	const withFn = (...withArgs: any[]) =>
		inst[key] = (...keyArgs: any[]) =>
			sourceFn.apply(inst, withArgs.concat(keyArgs));

	(withFn as any).decorator = (...args: any[]) => {
		const decorate = args[0];
		args = args.slice(1);

		inst[key] = () => decorate.apply(inst, [sourceFn, inst, key].concat(args));
	};

	return withFn;
}
