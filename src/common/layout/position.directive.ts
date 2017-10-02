import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
import { max } from 'ng2-qgrid/core/utility';
import { RootService } from '../../infrastructure/component';

@Directive({
	selector: '[q-grid-position]'
})
export class PositionDirective implements AfterViewInit {
	@Input('q-grid-position') public target = '';
	private element: HTMLElement;
	private opacity: string;

	constructor(element: ElementRef, private root: RootService) {
		this.element = element.nativeElement;
		this.opacity = this.element.style.opacity;
		this.element.style.opacity = '0';
	}

	ngAfterViewInit() {
		const targetName = this.target.toLowerCase();
		let node = this.element.parentNode;
		while (node) {
			if (node.nodeName.toLowerCase() === targetName) {
				this.layout(node, this.element);
				break;
			}
			node = node.parentNode;
		}

		this.element.style.opacity = this.opacity;
	}

	private layout(target, source) {
		const tr = target.getBoundingClientRect();
		const sr = source.getBoundingClientRect();
		const vr = this.root.table.view.rect();

		const intersections = [];
		intersections.push(
			this.intersection(vr, {
				index: 0,
				top: tr.top,
				right: tr.left + sr.width,
				bottom: tr.top + sr.height,
				left: tr.left
			}));

		intersections.push(
			this.intersection(vr, {
				index: 1,
				top: tr.top,
				right: tr.right,
				bottom: tr.top + sr.height,
				left: tr.right - sr.width
			}));

		intersections.push(
			this.intersection(vr, {
				index: 2,
				top: tr.bottom - sr.height,
				right: tr.left + sr.width,
				bottom: tr.bottom,
				left: tr.left
			}));

		intersections.push(
			this.intersection(vr, {
				index: 3,
				top: tr.bottom - sr.height,
				right: tr.right,
				bottom: tr.bottom,
				left: tr.right - sr.width
			}));

		const intersection = max(intersections, i => i.area);
		const rect = intersection.b;

		source.style.left = (rect.left - tr.left) + 'px';
		source.style.top = (rect.top - tr.top) + 'px';
	}

	private intersection(a, b) {
		const xo = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
		const yo = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
		const area = xo * yo;
		return { area, a, b };
	}
}
