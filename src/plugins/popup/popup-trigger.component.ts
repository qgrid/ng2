import Component from '@grid/view/components/component';
import TemplateLink from '@grid/view/components/template/template.link';
import {POPUP_NAME} from '../definition';

class PopupTrigger extends Component {
	constructor($scope, $element, $compile, $templateCache) {
		super();

		this.$scope = $scope;
		this.$element = $element;
		this.$templateScope = null;
		this.template = new TemplateLink($compile, $templateCache);
	}

	onInit() {
		const model = this.popup.model;
		const templateUrl = 'qgrid.plugin.popup-trigger.tpl.html';
		const templateScope = this.$scope.$new();
		const link = this.template.link(
			templateUrl,
			model.popup().resource,
			[`${this.popup.id}:trigger`]
		);

		link(this.$element, templateScope);
		this.$templateScope = templateScope;
	}

	onDestroy() {
		if (this.$templateScope) {
			this.$templateScope.$destroy();
		}
	}

	open(settings = {}) {
		if (!settings.target) {
			settings.target = this.$element[0];
		}

		this.popup.open(settings);
	}
}

PopupTrigger.$inject = [
	'$scope',
	'$element',
	'$compile',
	'$templateCache'
];

export default {
	controller: PopupTrigger,
	require: {
		popup: `^^${POPUP_NAME}`
	},
	controllerAs: '$popup'
};