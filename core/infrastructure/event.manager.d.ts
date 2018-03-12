export declare class EventManager {
	constructor(context: any, apply?: Function);

	bind(f: (arg: any) => void): (...args: any[]) => any;
}
