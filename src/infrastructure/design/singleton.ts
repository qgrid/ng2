export function Singleton() {
	let value;
	return (target: any, key: string, descriptor: PropertyDescriptor) => {
		return value || (value = descriptor.value);
	};
}
