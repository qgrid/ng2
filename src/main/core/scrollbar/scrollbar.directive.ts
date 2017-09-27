import {Directive, ElementRef, OnInit} from '@angular/core';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';
import {EventListener} from 'ng2-qgrid/core/infrastructure/event.listener';
import {EventManager} from 'ng2-qgrid/core/infrastructure/event.manager';

@Directive({
	selector: '[scrollbar]'
})
export class ScrollbarDirective implements OnInit {
	private config: PerfectScrollbarConfigInterface = {};
	private eventListener: EventListener;
	private detachEvent: any;

	onMouseEnter() {
		this.directiveScroll.scrollToY(0.01, 0.01);
		this.detachEvent();
	}

	ngOnInit() {
		this.detachEvent = this.eventListener.on('mouseenter', this.onMouseEnter);
	}

	constructor(private element: ElementRef, private directiveScroll: PerfectScrollbarDirective) {
		this.eventListener = new EventListener(this.element.nativeElement, new EventManager(this));
	}

	onScrollToXY(x: number, y: number, t: number) {
		this.directiveScroll.scrollTo(x, y, t);
	}

	onScrollToTop() {
		this.directiveScroll.scrollToTop();
	}

	onScrollToLeft() {
		this.directiveScroll.scrollToLeft();
	}

	onScrollToRight() {
		this.directiveScroll.scrollToRight();
	}

	onScrollToBottom() {
		this.directiveScroll.scrollToBottom();

	}
}

