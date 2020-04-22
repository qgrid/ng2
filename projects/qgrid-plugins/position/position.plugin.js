import { GRID_PREFIX } from '@qgrid/core/definition';
import { max } from '@qgrid/core/utility/kit';
import { EventListener } from '@qgrid/core/infrastructure/event.listener';
import { EventManager } from '@qgrid/core/infrastructure/event.manager';
import { jobLine } from '@qgrid/core/services/job.line';

export class PositionPlugin {
	constructor(context, disposable) {	
		this.element = context.element;
		this.targetName = context.targetName;

		const windowListener = new EventListener(window, new EventManager(this));
		const job = jobLine(400);

		disposable.add(windowListener.on('resize', () => {
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
		const br = this.boxRect();
		const intersections = [];

		intersections.push(
			this.intersection(br, {
				top: top,
				right: left + width,
				bottom: top + height,
				left: left
			}));

		intersections.push(
			this.intersection(br, {
				top: top,
				right: right,
				bottom: top + height,
				left: right - width
			}));

		intersections.push(
			this.intersection(br, {
				top: bottom - height,
				right: left + width,
				bottom: bottom,
				left: left
			}));

		intersections.push(
			this.intersection(br, {
				top: bottom - height,
				right: right,
				bottom: bottom,
				left: right - width
			}));

		const intersection = max(intersections, i => i.area);
		const { left: l, top: t } = intersection.b;
		const pos = this.fix({ left: l - br.left, top: t - br.top, width, height });

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
		const { width: vw, height: vh } = wr;
		const vx = br.left - wr.left;
		const vy = br.top - wr.top;
		const { height: rh, width: rw } = rect;
		const rx = rect.left + vx;
		const ry = rect.top + vy;
		const gtx1 = rx + rw > vw;
		const ltx0 = rx < 0;
		const gty1 = ry + rh > vh;
		const lty0 = ry < 0;
		const left = ltx0 || gtx1
			? (vw - rw) / 2 - vx
			: rect.left;
		const top = lty0 || gty1
			? (vh - rh) / 2 - vy
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