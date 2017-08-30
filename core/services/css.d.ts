export declare interface IEscapeResult{
	(value: string): string;
}

export declare const escape: IEscapeResult;

export declare function sheet(id: string): HTMLElement;
export declare function escapeClass(name: string): IEscapeResult;