import { GridPlugin } from '../plugin/grid.plugin';

export declare class EventHost {
	constructor(
		element: HTMLElement,
		plugin: GridPlugin
	);

	keyDown(e: any, source?: string): string[];
	keyUp(e: any, source?: string): string[];
	keyRelease(): void;

	mouseDown(e: MouseEvent): void;
	mouseMove(e: MouseEvent): void;
	mouseLeave(e: MouseEvent): void;
	mouseUp(e: MouseEvent): void;

	focusChange(): void;
}
