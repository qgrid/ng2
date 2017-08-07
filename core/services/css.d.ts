export declare interface IEscapeResult{
	(value: string): string;
}

export declare function sheet(id: string, source: string): HTMLElement;
export declare function escape(name: string): IEscapeResult;
export declare function escapeAttr(name: string): IEscapeResult;