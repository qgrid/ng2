import { GRID_PREFIX } from '@qgrid/core/definition';
import { max } from '@qgrid/core/utility/kit';
import { EventListener } from '@qgrid/core/event/event.listener';
import { EventManager } from '@qgrid/core/event/event.manager';
import { jobLine } from '@qgrid/core/services/job.line';

export class PositionPlugin {
	constructor(context, disposable) {
		this.element = context.element;
		this.targetName = context.targetName;

		const windowListener = new EventListener(window, new EventManager(this));
		const job = jobLine(400);

		disposable.add(
			windowListener.on('resize', () => {
				this.invalidate();
				// In case if after window resize there can different animated layout changes
				job(() => this.invalidate());
			}));
	}

	invalidate() {
		let node = this.element.parentNode;
		while (node) {
			const targetName = (this.targetName || '').toLowerCase();
			if (node.nodeName.toLowerCase() === targetName) {
				this.layout(node, this.element);
				this.element.style.opacity = 1;
				return;
			}
			node = node.parentNode;
		}
	}

	layout(target, source) {
		const { top, right, left, bottom } = target.getBoundingClientRect();
		const { width, height } = source.getBoundingClientRect();

		const fitRect = this.boxRect();
		const intersections = [];

		intersections.push(
			this.intersection(fitRect, {
				top: top,
				right: left + width,
				bottom: top + height,
				left: left
			}));

		intersections.push(
			this.intersection(fitRect, {
				top: top,
				right: right,
				bottom: top + height,
				left: right - width
			}));

		intersections.push(
			this.intersection(fitRect, {
				top: bottom - height,
				right: left + width,
				bottom: bottom,
				left: left
			}));

		intersections.push(
			this.intersection(fitRect, {
				top: bottom - height,
				right: right,
				bottom: bottom,
				left: right - width
			}));

		const intersection = max(intersections, i => i.area);
		const { left: l, top: t } = intersection.b;
		const pos = this.fix({ left: l - fitRect.left, top: t - fitRect.top, width, height });

		source.style.left = pos.left + 'px';
		source.style.top = pos.top + 'px';
	}

	intersection(a, b) {
		const xo = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
		const yo = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
		const area = xo * yo;
		return { area, a, b };
	}

	fix(rect) {
		const wr = this.windowRect();
		const br = this.boxRect();

		const { width: ww, height: wh } = wr;
		const abx = br.left - wr.left;
		const aby = br.top - wr.top;

		const { height: rh, width: rw } = rect;
		//  absolute coords relative to window
		const arx = rect.left + abx;
		const ary = rect.top + aby;

		const ltx0 = arx < wr.left;
		const gtx1 = arx + rw > ww;
		const lty0 = ary < wr.top;
		const gty1 = ary + rh > wh;

		// we are trying to show right bottom corner
		// it often has control buttons
		const left = ltx0 || gtx1
			? rect.left + (ww - arx - rw)
			: rect.left;

		const top = lty0 || gty1
			? rect.top + (wh - ary - rh)
			: rect.top;

		return { left, top };
	}

	boxRect() {
		let view = this.element;
		const marker = `${GRID_PREFIX}-box`;
		while (view) {
			if (view.classList && view.classList.contains(marker)) {
				return view.getBoundingClientRect();
			}

			view = view.parentNode;
		}

		return this.windowRect();
	}

	windowRect() {
		const { innerHeight: h, innerWidth: w } = window;
		return {
			top: 0,
			left: 0,
			bottom: h,
			right: w,
			height: h,
			width: w
		};
	}
}