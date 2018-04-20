import { PluginView } from '../plugin.view';
import { Model } from '../../core/infrastructure/model';
import { Event } from '../../core/infrastructure/event';
import { PersistenceService } from 'ng2-qgrid/core/persistence/persistence.service';

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

export class PersistenceView extends PluginView {
	constructor(model: Model);
	groups: PersistenceGroup[];
	items: PersistenceItem[];
	closeEvent: Event;

	get blank(): PersistenceItem;
	get sortedItems(): PersistenceItem[];

	isActive(item: PersistenceItem): boolean;
	isUniqueTitle(title: string): boolean;
	stringify(item?: PersistenceItem): string;
}
