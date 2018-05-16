import { AppError } from 'ng2-qgrid/core/infrastructure/error';

function decorate(method) {
	let instance;
	let hasInstance = false;
	return function value() {
		if (hasInstance) {
			return instance;
		}

		instance = method.call(this);
		hasInstance = true;
		return instance;
	};
}

export function Singleton() {
	return (target: any, key: string, descriptor: PropertyDescriptor) => {
		if (!descriptor.get) {
			throw new AppError('singleton', 'Only put a singleton decorator on a get accessor');
		}

		descriptor.get = decorate(descriptor.get);
		return descriptor;
	};
}
