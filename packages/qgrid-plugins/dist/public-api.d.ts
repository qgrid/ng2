import { GridPlugin, Event, Command, Node, ColumnModel, Expression, CellEditor, Model, Disposable, Validator } from '@qgrid/core';

declare class AutofocusPlugin {
	constructor(plugin: GridPlugin);
}

declare class BackdropPlugin {
	constructor(context: {
		element: HTMLElement,
		propagate: boolean,
		onKeyDown: (e: any) => void
	});

	closeEvent: Event;
}

declare class ColumnChooserPlugin {
    constructor(plugin: GridPlugin, context: { name: string });

    drag: Command<{ dragData: string }>;
    drop: Command<{ dragData: string, dropData: string }>;

    treeView: Node;
    cancelEvent: Event;
    submitEvent: Event;
    dropEvent: Event;

    search(value: string): void;
}

declare class ColumnChooserState {
	canAggregate: boolean;
	canSort: boolean;
}

declare class ColumnFilterPlugin {
	constructor(plugin: GridPlugin, context: { column: ColumnModel });

	by: Set<string>;
	expression: Expression;

	cancelEvent: Event;
	submitEvent: Event;

	getValue: (row: any) => any;

	column: ColumnModel;
	value: any;
	items: Array<any>;

	changeOperator: Command;
	reset: Command;
	commit: Command;
	cancel: Command;

	hasBlanks: boolean;
	isEmpty(): boolean;
}

declare class ColumnFilterState {
	threshold: number;
	source: string;
}

declare class ColumnSortPlugin {
    constructor(
        plugin: GridPlugin,
        context: {
            element: HTMLElement,
            column: ColumnModel,
            iconAsc: string,
            iconDesc: string,
        });

    mouseLeave();
    click(): boolean;
}

declare class DataManipulationPlugin {
	constructor(plugin: GridPlugin);
}

declare class DataManipulationState {
	deleted: Set<any>;
	added: Set<any>;
	edited: Set<any>;

	rowFactory: (row?: any) => any;
}

declare class EditFormPanelPlugin {
	constructor(
		plugin: GridPlugin,
		context: { row: any, caption: string },
	);

	editors: CellEditor[];
	submitEvent: Event;
	cancelEvent: Event;
	resetEvent: Event;
}

declare class ExportPlugin {
	constructor(model: Model,  type: string );
	
	readonly type: string;
	readonly csv: Command;
	readonly json: Command;
	readonly pdf: Command;
	readonly xlsx: Command;
	readonly xml: Command;
}

declare class FocusPlugin {
	constructor(context: any);
}

declare interface ImportOptions {
	head: 'alpha' | 'numeric' | 'default';
}
declare class ImportPlugin {
	constructor(model: Model, element: HTMLElement, options?: ImportOptions);

	load(e: any): void;
	upload(): void;
}

declare class PagerPlugin {
	constructor(model: GridPlugin);
}

interface PersistenceItem {
	title?: string;
	modified?: Date;
	model: {
		[key: string]: any
	};
	isDefault?: boolean;
	group: string;
	canEdit: boolean;
}

interface PersistenceGroup {
	key: string;
	items: PersistenceItem[];
}

declare class PersistencePlugin {
	constructor(plugin: GridPlugin, createDefaultModel: () => Model);

	groups: PersistenceGroup[];
	items: PersistenceItem[];
	closeEvent: Event;

	readonly blank: PersistenceItem;
	readonly sortedItems: PersistenceItem[];

	isActive(item: PersistenceItem): boolean;
	isUniqueTitle(title: string): boolean;
	stringify(item?: PersistenceItem): string;
}

declare class PositionPlugin {
	constructor(context: any, disposable: Disposable);
	invalidate(): void;
}

declare class RestPlugin {
	constructor(model: Model, context: { post: any, get: any });
}

declare class ValidatorPlugin {
	constructor(model: Model, context: any);

	context: any;
	model: { [ key: string ]: any };
	oldErrors: any[];
	validator: Validator;
	readonly errors: any[];
	readonly rules: any[];
	readonly type: string;
	readonly value: any;
}

export { AutofocusPlugin, BackdropPlugin, ColumnChooserPlugin, ColumnChooserState, ColumnFilterPlugin, ColumnFilterState, ColumnSortPlugin, DataManipulationPlugin, DataManipulationState, EditFormPanelPlugin, ExportPlugin, FocusPlugin, ImportPlugin, PagerPlugin, PersistenceItem, PersistencePlugin, PositionPlugin, RestPlugin, ValidatorPlugin };
