export declare class DeferPromise {
	catch(handler);
	then(handler);
}

export declare class Defer {
	promise: DeferPromise;
	reject();
	resolve();
}

