import {PluginView} from '../plugin.view';

export class LegendView extends PluginView {
	constructor(model){
		super(...arguments);
	}

	get resource() {
		return this.model.legend().resource;
	}
}

