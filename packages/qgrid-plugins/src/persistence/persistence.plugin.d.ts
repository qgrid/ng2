import { Event, GridPlugin, Model } from '@qgrid/core';

export interface PersistenceItem {
	title?: string;
	modified?: Date;
	model: {
		[key: string]: any;
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

	groups: PersistenceGroup[];
	items: PersistenceItem[];
	closeEvent: Event;

	readonly blank: PersistenceItem;
	readonly sortedItems: PersistenceItem[];

	constructor(plugin: GridPlugin, createDefaultModel: () => Model);

	isActive(item: PersistenceItem): boolean;
	isUniqueTitle(title: string): boolean;
	stringify(item?: PersistenceItem): string;
}
