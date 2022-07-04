import { Rect } from '../dom/rect';

export interface Position {
	x: number;
	y: number;
	rect: Rect;
}

export declare class DragService {
  static data: any;
  static area: string | null;
  static element: HTMLElement | null;
  static startPosition: Position | null;

  static readonly mimeType: string;
  static decode(source: string): any;
  static encode(source: any): string;
}
