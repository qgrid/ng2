import { Command } from '../command/command';
import { GridPlugin } from '../plugin/grid.plugin';
import { SceneStateColumnRows, SceneStateColumnLine } from '../scene/scene.state';

export declare class HeadLet {
	constructor(plugin: GridPlugin, tagName: string);

	readonly drop: Command<{ dragData: string }>;
	readonly drag: Command<{ dragData: string }>;

	readonly resize: Command;

	readonly rows: SceneStateColumnRows;

	columns(row: any, pin: string): SceneStateColumnLine;
}
