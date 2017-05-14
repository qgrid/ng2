import Component from '@grid/view/components/component';
import TemplateLink from '@grid/view/components/template/template.link';
import {EventListener} from '@grid/core/infrastructure';
import * as def from '../definition';

class PopupHead extends Component {
	constructor($scope, $element, $document, $window, $compile, $templateCache, qGridPopupService) {
		super();

		this.position = {
			x: 0,
			y: 0
		};

		this.$scope = $scope;
		this.$element = $element;
		this.$document = $document;
		this.$window = $window;
		this.qGridPopupService = qGridPopupService;
		this.$templateScope = null;
		this.template = new TemplateLink($compile, $templateCache);
		this.eventListener = new EventListener(this, this.$element[0]);

		this.$element.attr('draggable', true);
	}

	onInit() {
		const popup = this.popup;
		const popupElement = popup.$element;
		const model = this.model;
		const templateUrl = 'qgrid.plugin.popup-head.tpl.html';
		const templateScope = this.$scope.$new();
		const link = this.template.link(
			templateUrl,
			model.popup().resource,
			[`${this.id}:head`]
		);

		link(this.$element, templateScope);
		this.$templateScope = templateScope;

		this.eventListener.on('dragstart', e => {
			this.position.x = e.offsetX;
			this.position.y = e.offsetY;

			popupElement.addClass('drag');
			e.dataTransfer.setDragImage(angular.element('<div></div>')[0], 0, 0); // eslint-disable-line no-undef
		});

		this.eventListener.on('drag', event => {
			const cx = event.clientX;
			const cy = event.clientY;
			const x = this.position.x;
			const y = this.position.y;

			if (cx || cy) {
				let l = cx - x;
				let t = cy - y;
				const w = this.$element.clientWidth;
				const h = this.$element.clientHeight;
				const el = 0;
				const er = this.$window.innerWidth - w;
				const et = 0;
				const eb = this.$window.innerHeight - h;

				l = l <= el ? el : l >= er ? er : l;
				t = t <= et ? et : t >= eb ? eb : t;

				popupElement.css('left', l + 'px');
				popupElement.css('top', t + 'px');
			}
		});

		this.eventListener.on('dragend', () => {
			this.$element.removeClass('drag');
		});

		this.$document.find('body').bind('dragover', this.onDragOver);
	}

	onDragOver(e) {
		e.preventDefault();
	}

	onDestroy() {
		if (this.$templateScope) {
			this.$templateScope.$destroy();
		}

		this.$document.find('body').unbind('dragover', this.onDragOver);
	}
}

PopupHead.$inject = [
	'$scope',
	'$element',
	'$document',
	'$window',
	'$compile',
	'$templateCache',
	'qGridPopupService'
];

export default {
	controller: PopupHead,
	controllerAs: '$popupHead',
	require: {
		popup: `^^${def.POPUP_PANEL_NAME}`
	},
	bindings: {
		model: '<',
		id: '<'
	}
};