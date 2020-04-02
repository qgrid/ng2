import { Rect } from "ng2-qgrid/core/dom/rect";

export interface Position {
	x: number;
	y: number;
	rect: Rect;
}

export declare class DragService {
	static data: any;
	static area: string;
	static element: HTMLElement;
	static startPosition: Position;

	static readonly mimeType: string;
	static decode(source: string): any;
	static encode(source: any): string;
}
