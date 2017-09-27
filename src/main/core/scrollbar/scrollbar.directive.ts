import {Directive, ElementRef, OnInit} from '@angular/core';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';
import {EventListener} from 'ng2-qgrid/core/infrastructure/event.listener';
import {EventManager} from 'ng2-qgrid/core/infrastructure/event.manager';

@Directive({
	selector: '[q-grid-scrollbar]'
})
export class ScrollbarDirective implements OnInit {
	private config: PerfectScrollbarConfigInterface = {};
	private eventListener: EventListener;
	private detachEvent: any;

	onMouseEnter() {
		this.scroll.scrollToY(0.01, 0.01);
		this.detachEvent();
	}

	ngOnInit() {
		this.detachEvent = this.eventListener.on('mouseenter', this.onMouseEnter);
	}

	constructor(private element: ElementRef, private scroll: PerfectScrollbarDirective) {
		this.eventListener = new EventListener(this.element.nativeElement, new EventManager(this));
	}

	onScrollToXY(x: number, y: number, v: number) {
		this.scroll.scrollTo(x, y, v);
	}

	onScrollToTop() {
		this.scroll.scrollToTop();
	}

	onScrollToLeft() {
		this.scroll.scrollToLeft();
	}

	onScrollToRight() {
		this.scroll.scrollToRight();
	}

	onScrollToBottom() {
		this.scroll.scrollToBottom();

	}
}

