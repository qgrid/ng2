import { PluginView } from '../plugin.view';
import { Model } from '../../core/infrastructure/model';
import { Event } from '../../core/infrastructure/event'

export class PersistenceView extends PluginView {
	constructor(model: Model);
	closeEvent: Event;
}
