import {EventManager} from 'ng2-qgrid/core/infrastructure';
import {isFunction, noop} from 'ng2-qgrid/core/utility';
import {IFunc} from 'ng2-qgrid/core/dom/view';
import {EventListener, IOnResult} from 'ng2-qgrid/core/infrastructure/event.listener';
import {IPopupSettings} from 'ng2-qgrid/plugins/popup/popup.service';
import {Event} from 'ng2-qgrid/core/infrastructure/event';

export interface IState {
	expanded: boolean;
	active: boolean;
}

export interface ILayout {
	position: any;
	size: any;
}

export class Popup {
	private event: Event;
	private state: IState;
	private layout: ILayout;
	private onClose: any;

	constructor(private element: HTMLElement, private settings: IPopupSettings, private body: HTMLElement) {
		this.event = new Event();
		this.state = {
			expanded: false,
			active: false
		};
		this.layout = {
			position: {},
			size: {}
		};
		this.onClose = isFunction(settings.close) ? settings.close : noop;
	}

	close(): void {
		this.onClose();
		this.element.remove();
	}

	expand(): void {
		const position = {
			top: this.element.style.top,
			left: this.element.style.left
		};
		const size = {
			width: this.element.offsetWidth,
			height: this.element.offsetHeight
		};
		this.layout = {
			position,
			size
		};
		this.element.classList.add('expanded');
		this.state.expanded = true;

		this.event.emit('expand');
	}

	collapse(): void {
		const popupElement = this.element[0];

		this.element.classList.remove('expanded');
		this.state.expanded = false;

		popupElement.style.width = this.layout.size.width;
		popupElement.style.height = this.layout.size.height;
		popupElement.style.top = this.layout.position.top;
		popupElement.style.left = this.layout.position.left;

		this.event.emit('collapse');
	}

	focus(): void {
		this.state.active = true;
		this.element.classList.add('active');
		this.element.setAttribute('tabindex', '0');
		this.element.focus();

		this.event.emit('focus');
	}

	unfocus(): void {
		this.state.active = false;
		this.element.classList.remove('active');
		this.element.removeAttribute('tabindex');
	}

	isFocused(): boolean {
		return this.state.active;
	}

	keyDown(f: IFunc): IOnResult {
		return new EventListener(this.element[0], new EventManager(this)).on('keydown', f);
	}

	resize(settings: IPopupSettings): void {
		this.element.setAttribute('width',
			Math.min(settings.width, this.body.clientWidth - this.element.offsetLeft) + 'px');
		this.element.setAttribute('height',
			Math.min(settings.height, this.body.clientHeight - this.element.offsetTop) + 'px');
		this.event.emit('resize');
	}
}
