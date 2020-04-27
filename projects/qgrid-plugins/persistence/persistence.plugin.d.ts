import { Model } from '@qgrid/core/infrastructure/model';
import { Event } from '@qgrid/core/infrastructure/event';
import { GridModel } from '@qgrid/core/grid/grid.model';

export interface PersistenceItem {
	title?: string;
	modified?: Date;
	model: {
		[key: string]: any
	};
	isDefault?: boolean;
	group: string;
	canEdit: boolean;
}

export interface PersistenceGroup {
	key: string;
	items: PersistenceItem[];
}

export declare class PersistencePlugin {
	constructor(plugin: GridModel, createDefaultModel: () => Model);

	groups: PersistenceGroup[];
	items: PersistenceItem[];
	closeEvent: Event;

	readonly blank: PersistenceItem;
	readonly sortedItems: PersistenceItem[];

	isActive(item: PersistenceItem): boolean;
	isUniqueTitle(title: string): boolean;
	stringify(item?: PersistenceItem): string;
}
