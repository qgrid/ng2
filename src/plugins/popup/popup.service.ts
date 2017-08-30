import {ElementRef, Injectable} from '@angular/core';
import {AppError} from 'ng2-qgrid/core/infrastructure';
import {Model} from 'ng2-qgrid/core/infrastructure/model';
import {Popup} from 'ng2-qgrid/plugins/popup/popup.entry';

export interface IOffset {
	left: number;
	top: number;
}

export interface ITarget {
	offset: () => IOffset;
	height: () => number;
	width: () => number;
}

export interface IPopupSettings {
	height: any;
	width: any;
	offsetTop: any;
	offsetLeft: any;
	target: any;
	id: string;
	close: any;
	resizable: boolean;
	collapsible: boolean;
	cls: boolean;
}

export let PopupSettings: IPopupSettings = {
	height: null,
	width: null,
	offsetTop: null,
	offsetLeft: null,
	target: null,
	id: null,
	close: null,
	resizable: null,
	collapsible: null,
	cls: null
};

@Injectable()
export class PopupService {

	private settings: IPopupSettings;
	private popups: Map<string, Popup> = new Map();

	constructor(private element: ElementRef) {
	}

	public close(id: string): void {
		if (!this.isOpened(id)) {
			throw new AppError('popup.service', `Can't close popup '${id}', it's not opened`);
		}

		const item = this.popups.get(id);
		this.popups.delete(id);
		item.close();
	}

	public isOpened(id: string): boolean {
		return this.popups.hasOwnProperty(id);
	}

	public closeAll(): void {
		for (let key of Object.keys(this.popups)) {
			this.close(key);
		}
	}

	private createScope(): object {
		// this.$rootScope.$new(false, scope);
		return null;
	}

	public open(settings: IPopupSettings, model: Model, scope: object): void {
		if (this.popups.hasOwnProperty(settings.id)) {
			return;
		}

		const target = this.targetize(settings);
		const pos = this.position(target, settings);
		const popupScope = this.createScope();

		// popupScope.model = model;
		// popupScope.id = settings.id;

		const popup = this.element.nativeElement.document.body
			.getElementsByTagName('<q-grid:popup-panel id="id" model="model">')[0]; // eslint-disable-line no-undef
		this.popups[this.settings.id] = new Popup(popup, this.settings, this.element.nativeElement.document[0].body);

		this.element.nativeElement.document[0].body.appendChild(popup[0]);
		// this.$compile(popup)(popupScope);

		popup.setAttribute('id', settings.id);
		popup.style.left = pos.left + 'px';
		popup.style.top = pos.top + 'px';
		popup.style.zIndex = 79;

		if (settings.resizable) {
			popup.addClass('resizable');
		}

		if (settings.collapsible) {
			popup.addClass('collapsible');
		}

		if (settings.cls) {
			popup.addClass(settings.cls);
		}

		this.popups[settings.id].focus();
	}

	public expand(id: string): void {
		const item = this.popups[id];
		item.expand();
	}

	public collapse(id: string): void {
		const item = this.element.nativeElement.self.popups[id];
		item.collapse();
	}

	public focus(id: string): void {
		this.popups.forEach(popup => popup.unfocus());

		const popup = this.popups.get(id);
		popup.focus();
	}

	public resize(id: string, settings: IPopupSettings): void {
		const item = this.popups.get(id);
		item.resize(settings);
	}

	public targetize(settings: IPopupSettings): ITarget {
		const target = settings.target;
		if (!target) {
			return {
				offset: () => {
					return {
						left: (this.element.nativeElement.window.innerWidth()) / 2,
						top: (this.element.nativeElement.window.innerHeight() - (parseInt(settings.height, 10) || 0)) / 2
					};
				},
				height: () => {
					return 500;
				},
				width: () => {
					return 400;
				}
			};
		}

		const rect = target.getBoundingClientRect();
		return {
			offset: () => ({
				left: rect.left,
				top: rect.top
			}),
			height: () => target.clientHeight,
			width: () => target.clientWidth
		};
	}

	public position(target: ITarget, settings: IPopupSettings): IOffset {
		const dy = parseInt(settings.offsetTop, 10) || 0;
		const dx = parseInt(settings.offsetLeft, 10) || 0;
		const w = this.element.nativeElement.window.innerWidth();
		const h = this.element.nativeElement.window.innerHeight();
		const p = target.offset();
		const x = p.left;
		const y = p.top;
		const eh = parseInt(settings.height, 10) || target.height();
		const ew = parseInt(settings.width, 10) || target.width();
		const eh2 = eh / 2;
		const ew2 = ew / 2;
		const gtx1 = x + ew2 > w;
		const ltx0 = x - ew2 < 0;
		const gty1 = y + eh > h;
		const lty0 = y - eh < 0;
		const l = ltx0 && gtx1
			? w / 2 - ew2
			: gtx1
				? x - ew - dx
				: ltx0
					? x + dx
					: x - ew2 + dx;
		const t = lty0 && gty1
			? h / 2 - eh2
			: gty1
				? y - eh - dy
				: lty0
					? y + dy
					: y + dy;

		return {
			left: l,
			top: t
		};
	}

	public get(id: string): any {
		return this.popups.get(id);
	}
}
