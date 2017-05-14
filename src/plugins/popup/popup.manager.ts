import {Event} from '@grid/core/infrastructure';
import {isFunction, noop} from '@grid/core/services/utility';

export default class Popup {
	constructor(element, settings, body) {
		this.element = element;
		this.event = new Event();
		this.state = {
			expanded: false,
			active: false
		};
		this.body = body;
		this.layout = {
			position: {},
			size: {}
		};
		this.settings = settings;

		this.onClose = isFunction(settings.close) ? settings.close : noop;
	}

	close() {
		this.onClose();
		this.element.remove();
	}

	expand() {
		const
			position = {
				top: this.element.style.top,
				left: this.element.style.left
			},
			size = {
				width: this.element.offsetWidth,
				height: this.element.offsetHeight
			};
		this.layout = {
			position: position,
			size: size
		};
		this.element.addClass('expanded');
		this.state.expanded = true;

		this.event.emit('expand');
	}

	collapse() {
		const popupElement = this.element[0];

		this.element.removeClass('expanded');
		this.state.expanded = false;

		popupElement.style.width = this.layout.size.width;
		popupElement.style.height = this.layout.size.height;
		popupElement.style.top = this.layout.position.top;
		popupElement.style.left = this.layout.position.left;

		this.event.emit('collapse');
	}

	focus() {
		this.state.active = true;
		this.element.addClass('active');
		this.element.attr('tabindex', 0);
		this.element.focus();

		this.event.emit('focus');
	}

	unfocus() {
		this.state.active = false;
		this.element.removeClass('active');
		this.element.removeAttr('tabindex');
	}

	resize(settings) {
		this.element.css({
			width: Math.min(settings.width, this.body.clientWidth - this.element.offsetLeft) + 'px',
			height: Math.min(settings.height, this.body.clientHeight - this.element.offsetTop) + 'px'
		});
		this.event.emit('resize');
	}
}