import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';
import { SceneStateColumnLine, SceneStateColumnRows } from '../scene/scene.state';

export declare class HeadLet {
	readonly drop: Command<{ dragData: string }>;
	readonly drag: Command<{ dragData: string }>;

	readonly resize: Command;

	readonly rows: SceneStateColumnRows;

	constructor(plugin: GridPlugin, tagName: string);


	columns(row: any, pin: string): SceneStateColumnLine;
}
