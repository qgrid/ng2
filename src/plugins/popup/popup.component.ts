import PluginComponent from '../plugin.component';
import {POPUP_NAME} from '../definition';
import {TemplatePath} from '@grid/core/template';

require('./popup.scss');

TemplatePath
	.register(POPUP_NAME, (template, popup) => {
		return {
			model: 'popup',
			resource: `${popup.id}:${template.for}`
		};
	});

const Plugin = PluginComponent('popup', {models: ['popup'], inject: ['$transclude', 'qGridPopupService']});
class Popup extends Plugin {
	constructor() {
		super(...arguments);
	}

	onInit() {
	}

	show() {
		let template = null;
		let templateScope = null;

		this.$transclude((clone, scope) => {
			template = clone;
			templateScope = scope;

			this.$element.append(clone);
		});

		template.remove();
		templateScope.$destroy();

		super.show();
	}

	open(settings = {}) {
		settings.id = this.id;
		this.qGridPopupService.open(
			settings,
			this.model,
			this.$scope
		);
	}

	get resource() {
		return this.model.popup().resource;
	}

	onDestroy() {
		this.qGridPopupService.closeAll();
	}
}

export default Popup.component({
	transclude: true,
	controller: Popup,
	controllerAs: '$popup',
	bindings: {
		id: '@',
		resourceModel: '@resource'
	}
});