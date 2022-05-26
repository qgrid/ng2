import { isFunction } from '@qgrid/core';

type ObjectWithFn = Record<string, (...args: unknown[]) => unknown>;

export function method<T extends ObjectWithFn>(inst: T, key: string) {
  const sourceFn = inst[key];

  return {
    with: withFactory(inst, key, sourceFn),
  };
}

export function methodsOf<T extends ObjectWithFn>(inst: T) {
  const keys = Object.keys(inst) as Array<keyof T>;
  const length = keys.length;
  const patch = {} as { [key in keyof T]: { with: (...args: unknown[]) => unknown } };

  for (let i = 0; i < length; i++) {
    const key = keys[i];
    if (isFunction(inst[key])) {
      patch[key] = method(inst, key as string);
    }
  }

  return {
    with: (...args: unknown[]) => {
      const patchKeys = Object.keys(patch) as Array<keyof T>;
      const patchLength = patchKeys.length;

      for (let i = 0; i < patchLength; i++) {
        const key = patchKeys[i];

        (inst as T & { action: keyof T }).action = key;
        patch[key].with.apply(inst, args);
      }
    },
  };
}

export function withFactory(inst: ObjectWithFn, key: string, sourceFn: (...args: unknown[]) => unknown) {
  const withFn = (...withArgs: unknown[]) =>
    inst[key] = (...keyArgs: unknown[]) => sourceFn.apply(inst, withArgs.concat(keyArgs));

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
