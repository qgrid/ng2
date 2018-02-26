export declare class DragService {
	static get mimeType(): string;
	static get transfer(): any;
	static set transfer(value: any): void
	static decode(source: string): any;
	static encode(source: any): string;
}
