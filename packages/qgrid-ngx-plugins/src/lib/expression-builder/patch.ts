import { isFunction } from '@qgrid/core';

export function method<T>(inst: T, key: string) {
  const sourceFn = inst[key];

  return {
    with: withFactory(inst, key, sourceFn),
  };
}

export function methodsOf<T>(inst: T) {
  const keys = Object.keys(inst);
  const length = keys.length;
  const patch: { [key: string]: { with: () => unknown } } = {};

  for (let i = 0; i < length; i++) {
    const key = keys[i];
    if (isFunction(inst[key])) {
      patch[key] = method(inst, key);
    }
  }

  return {
    with: (...args: unknown[]) => {
      const patchKeys = Object.keys(patch);
      const patchLength = patchKeys.length;

      for (let i = 0; i < patchLength; i++) {
        const key = patchKeys[i];

        (inst as T & { action: string }).action = key;
        patch[key].with.apply(inst, args);
      }
    },
  };
}

export function withFactory<T>(inst: T, key: string, sourceFn: () => unknown) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const withFn = (...withArgs: any[]) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inst[key] = (...keyArgs: any[]) =>
      sourceFn.apply(inst, withArgs.concat(keyArgs));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (withFn as any).decorator = (...args: any[]) => {
    const decorate = args[0];
    args = args.slice(1);

    inst[key] = () => decorate.apply(inst, [
      sourceFn,
      inst,
      key,
    ].concat(args));
  };

  return withFn;
}
