import Component from '@grid/view/components/component';
import TemplateLink from '@grid/view/components/template/template.link';

class PopupPanel extends Component {
	constructor($scope, $element, $compile, $templateCache, qGridPopupService) {
		super();

		this.$scope = $scope;
		this.$element = $element;
		this.qGridPopupService = qGridPopupService;
		this.$templateScope = null;
		this.template = new TemplateLink($compile, $templateCache);
	}

	onInit() {
		const model = this.model;
		const templateUrl = 'qgrid.plugin.popup-panel.tpl.html';
		const templateScope = this.$scope.$new();
		const link = this.template.link(
			templateUrl,
			model.popup().resource
		);

		link(this.$element, templateScope);
		this.$templateScope = templateScope;
		this.$element.addClass('q-grid-popup');
	}

	onDestroy(){
		if (this.$templateScope) {
			this.$templateScope.$destroy();
		}
	}

	close() {
		this.qGridPopupService.close(this.id);
	}
}

PopupPanel.$inject = [
	'$scope',
	'$element',
	'$compile',
	'$templateCache',
	'qGridPopupService'
];

export default {
	controller: PopupPanel,
	controllerAs: '$popup',
	bindings: {
		id: '<',
		model: '<'
	}
};