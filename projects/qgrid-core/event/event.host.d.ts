import { GridPlugin } from '../plugin/grid.plugin';

export declare class EventHost {
	constructor(
		element: HTMLElement,
		plugin: GridPlugin
	);

	keyDown(e: KeyboardEvent): boolean;
	keyUp(e: KeyboardEvent): void;
	keyRelease(): void;

	mouseDown(e: MouseEvent): boolean;
	mouseMove(e: MouseEvent): void;
	mouseLeave(e: MouseEvent): void;
	mouseUp(e: MouseEvent): void;

	checkFocus(): boolean;
}
