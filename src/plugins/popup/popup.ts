import { EventManager } from 'ng2-qgrid/core/infrastructure';
import { isFunction, noop } from 'ng2-qgrid/core/utility';
import { EventListener} from 'ng2-qgrid/core/infrastructure/event.listener';
import { Event } from 'ng2-qgrid/core/infrastructure/event';
import { PopupSettings } from './popup.settings';
import { Portal } from '@angular/cdk/portal';

class PopupState {
	public expanded = false;
	public active = false;
}

class PopupArea {
	public top = 0;
	public left = 0;
	public width = 0;
	public height = 0;
}

export class Popup {
	private state = new PopupState();
	private area = new PopupArea();

	public body: HTMLElement;
	public portal: Portal<any>;

	constructor(public id: string, public settings: PopupSettings, public element: HTMLElement) {
	}

	public expand(): void {
		const element = this.element;

		this.area.top = element.clientTop;
		this.area.left = element.clientLeft;
		this.area.width = element.clientWidth;
		this.area.height = element.clientHeight;

		this.state.expanded = true;

		element.classList.add('expanded');
	}

	public collapse(): void {
		const element = this.element;

		element.classList.remove('expanded');

		this.state.expanded = false;
		element.style.width = this.area.width + 'px';
		element.style.height = this.area.height + 'px';
		element.style.top = this.area.top + 'px';
		element.style.left = this.area.left + 'px';
	}

	public focus(): void {
		this.state.active = true;
		this.element.classList.add('active');
		this.element.setAttribute('tabindex', '0');
		this.element.focus();
	}

	public unfocus(): void {
		this.state.active = false;
		this.element.classList.remove('active');
		this.element.removeAttribute('tabindex');
	}

	public isFocused(): boolean {
		return this.state.active;
	}

	public resize(settings: PopupSettings): void {
		const width = Math.min(settings.width, this.body.clientWidth - this.element.offsetLeft);
		const height = Math.min(settings.height, this.body.clientHeight - this.element.offsetTop);

		this.element.setAttribute('width', `${width}px`);
		this.element.setAttribute('height', `${height}px`);
	}
}
