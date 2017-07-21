export interface INoopResult{
	(): void;
}
export interface IYesResult{
	(): boolean;
}

export interface INoResult{
	(): boolean;
}

export interface IIdentityResult{
	(any): any;
}

export interface IToCamelCaseResult{
	(...names: string[]): string;
}

export interface IIsEmailResult{
	(value: string): boolean;
}

export declare const noop: INoopResult;
export declare const yes: IYesResult;
export declare const no: INoResult;
export declare const identity: IIdentityResult;
export declare const toCamelCase: IToCamelCaseResult;
export declare const isEmail: IIsEmailResult;
