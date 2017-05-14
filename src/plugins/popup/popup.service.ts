import TemplateLink from '@grid/view/components/template/template.link';
import PopupManager from './popup.manager';

export default class PopupService {
	constructor() {
		Array.from(arguments).forEach((arg, index) => this[PopupService.$inject[index]] = arg);

		this.template = new TemplateLink(this.$compile, this.$templateCache);
		this.popups = {};
	}

	close(id) {
		const item = this.popups[id];
		item.close();

		delete this.popups[id];
	}

	closeAll() {
		for (let key of Object.keys(this.popups)) {
			this.close(key);
		}
	}

	open(settings, model, scope) {
		if (this.popups.hasOwnProperty(settings.id)) {
			return;
		}

		const target = this.targetize(settings);
		const pos = this.position(target, settings);
		const popupScope = this.$rootScope.$new(false, scope);

		popupScope.model = model;
		popupScope.id = settings.id;

		const popup = angular.element('<q-grid:popup-panel id="id" model="model"></q-grid:popup-panel>'); // eslint-disable-line no-undef

		this.$document[0].body.append(popup[0]);
		this.$compile(popup)(popupScope);

		popup.attr('id', settings.id);
		popup.css({left: pos.left + 'px', top: pos.top + 'px', zIndex: 79});

		if (settings.resizable) {
			popup.addClass('resizable');
		}

		if (settings.collapsible) {
			popup.addClass('collapsible');
		}

		if (settings.cls) {
			popup.addClass(settings.cls);
		}

		this.popups[settings.id] = new PopupManager(popup, settings, this.$document[0].body);
		this.popups[settings.id].focus();
	}

	expand(id) {
		const item = this.popups[id];
		item.expand();
	}

	collapse(id) {
		const item = self.popups[id];
		item.collapse();
	}

	focus(id) {
		for (let [, popup] of this.popups) {
			popup.unfocus();
		}

		const popup = this.popups[id];
		popup.focus();
	}

	resize(id, settings) {
		const item = this.popups[id];
		item.resize(settings);
	}

	targetize(settings) {
		const target = settings.target;
		if (!target) {
			return {
				offset: () => {
					return {
						left: this.$window.innerWidth / 2,
						top: (this.$window.innerHeight - (parseInt(settings.height) || 0)) / 2
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

	position(target, settings) {
		const dy = parseInt(settings.offsetTop) || 0;
		const dx = parseInt(settings.offsetLeft) || 0;
		const w = this.$window.innerWidth;
		const h = this.$window.innerHeight;
		const p = target.offset();
		const x = p.left;
		const y = p.top;
		const eh = parseInt(settings.height) || target.height();
		const ew = parseInt(settings.width) || target.width();
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
}


PopupService.$inject = [
	'$rootScope',
	'$window',
	'$document',
	'$templateCache',
	'$compile',
	'$timeout'
];
