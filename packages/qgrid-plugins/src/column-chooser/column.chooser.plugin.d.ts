import { Command, Event, GridPlugin, Node } from '@qgrid/core';

export declare class ColumnChooserPlugin {
	drag: Command<{ dragData: string }>;
	drop: Command<{ dragData: string; dropData: string }>;

	treeView: Node;
	cancelEvent: Event;
	submitEvent: Event;
	dropEvent: Event;

	constructor(plugin: GridPlugin, context: { name: string });

	search(value: string): void;
}
