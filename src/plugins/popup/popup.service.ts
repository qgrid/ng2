import {
	ComponentFactory,
	ComponentFactoryResolver,
	Injectable,
	ViewContainerRef,
	ApplicationRef,
	Injector
} from '@angular/core';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { Popup } from './popup';
import { PopupSettings } from './popup.settings';
import { DomPortalHost, ComponentType, ComponentPortal } from '@angular/cdk/portal';

interface IOffset {
	left: number;
	top: number;
}

interface ITarget {
	offset: () => IOffset;
	height: () => number;
	width: () => number;
}

@Injectable()
export class PopupService {

	private host: DomPortalHost;
	private popups: Map<string, Popup> = new Map();

	constructor(resolver: ComponentFactoryResolver, injector: Injector, app: ApplicationRef) {
		this.host = new DomPortalHost(document.body, resolver, app, injector);
	}

	public port<T>(type: ComponentType<T>, viewContainerRef?: ViewContainerRef) {
		const portal = new ComponentPortal(type, viewContainerRef);
		const component = portal.attach(this.host).instance;

		return (popupFactory: (T) => Popup) => {
			const popup = popupFactory(component);

			if (this.popups.hasOwnProperty(popup.id)) {
				throw new AppError(
					'popup.service',
					`Can't open popup '${popup.id}', it's already opened`
				);
			}

			popup.portal = portal;

			const element = popup.element;
			const settings = popup.settings;
			const target = this.targetize(null, settings);
			const pos = this.position(target, settings);

			this.popups.set(popup.id, popup);

			element.setAttribute('id', popup.id);
			element.style.left = pos.left + 'px';
			element.style.top = pos.top + 'px';
			element.style.width = settings.width + 'px';
			element.style.height = settings.height + 'px';

			if (settings.resizable) {
				element.classList.add('resizable');
			}

			if (settings.collapsible) {
				element.classList.add('collapsible');
			}

			if (settings.class) {
				element.classList.add(settings.class);
			}

			popup.focus();
		};
	}

	public close(id: string): void {
		if (!this.isOpened(id)) {
			throw new AppError(
				'popup.service',
				`Can't close popup '${id}', it's not opened`
			);
		}

		const popup = this.popups.get(id);
		this.popups.delete(id);
		popup.portal.detach();
	}

	public closeAll(): void {
		const keys = Object.keys(this.popups);
		for (const id of keys) {
			this.close(id);
		}
	}

	public isOpened(id: string): boolean {
		return this.popups.has(id);
	}

	public expand(id: string): void {
		const popup = this.get(id);
		popup.expand();
	}

	public collapse(id: string): void {
		const popup = this.get(id);
		popup.collapse();
	}

	public focus(id: string): void {
		this.popups.forEach(p => p.unfocus());

		const popup = this.popups.get(id);
		popup.focus();
	}

	public resize(id: string, settings: PopupSettings): void {
		const popup = this.popups.get(id);
		popup.resize(settings);
	}

	public get(id) {
		return this.popups.get(id);
	}

	private targetize(target: HTMLElement, settings: PopupSettings): ITarget {
		if (!target) {
			return {
				offset: () => {
					return {
						left: window.innerWidth / 2,
						top: (window.innerHeight - settings.height) / 2
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

	private position(target: ITarget, settings: PopupSettings): IOffset {
		const dy = settings.offsetTop || 0;
		const dx = settings.offsetLeft || 0;
		const w = window.innerWidth;
		const h = window.innerHeight;
		const p = target.offset();
		const x = p.left;
		const y = p.top;
		const eh = settings.height || target.height();
		const ew = settings.width || target.width();
		const eh2 = eh / 2;
		const ew2 = ew / 2;
		const gtx1 = x + ew2 > w;
		const ltx0 = x - ew2 < 0;
		const gty1 = y + eh > h;
		const lty0 = y - eh < 0;
		const l =
			ltx0 && gtx1
				? w / 2 - ew2
				: gtx1 ? x - ew - dx : ltx0 ? x + dx : x - ew2 + dx;
		const t =
			lty0 && gty1
				? h / 2 - eh2
				: gty1 ? y - eh - dy : lty0 ? y + dy : y + dy;

		return {
			left: l,
			top: t
		};
	}
}
