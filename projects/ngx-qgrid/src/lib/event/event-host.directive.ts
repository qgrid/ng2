import { Directive, OnInit, NgZone, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EventHost } from '@qgrid/core/event/event.host';
import { EventListener } from '@qgrid/core/event/event.listener';
import { EventManager } from '@qgrid/core/event/event.manager';
import { eventPath } from '@qgrid/core/services/dom';
import { GridPlugin } from '../plugin/grid-plugin';
import { ShortcutService } from '../shortcut/shortcut.service';

@Directive({
	selector: '[q-grid-event-host]',
})
export class EventHostDirective implements OnInit {
	constructor(
		private plugin: GridPlugin,
		private zone: NgZone,
		private element: ElementRef,
		@Inject(DOCUMENT) private document: any,
		private shortcutService: ShortcutService
	) {
	}

	ngOnInit() {
		const { model, disposable } = this.plugin;
		const { nativeElement } = this.element;

		const host = new EventHost(
			nativeElement,
			this.plugin,
		);

		const hostListener = new EventListener(nativeElement, new EventManager(this));
		const docListener = new EventListener(this.document, new EventManager(this));
		const wndListener = new EventListener(window, new EventManager(this));

		this.zone.runOutsideAngular(() => {
			disposable.add(hostListener.on('mousemove', e => host.mouseMove(e)));
			disposable.add(hostListener.on('mouseleave', e => host.mouseLeave(e)));
			disposable.add(hostListener.on('mouseup', e => host.mouseUp(e)));
			disposable.add(docListener.on('focusin', () => host.focusChange()));

			disposable.add(
				docListener.on('mousedown', e => {
					const path = eventPath(e);
					const clickedOutside = path.every(x => x !== nativeElement);
					if (clickedOutside) {
						if (model.edit().status === 'edit') {
							model.edit({
								status: 'view'
							}, {
								source: 'document.click'
							});
						}
					}
				}));

			disposable.add(
				hostListener.on('keyup', e => {
					host.keyUp(e, 'grid');
					this.shortcutService.keyUp(e);
				})
			);

			disposable.add(
				wndListener.on('blur', () => {
					host.keyRelease();
					this.shortcutService.reset();
				})
			);
		});

		disposable.add(
			hostListener.on('mousedown', e => host.mouseDown(e))
		);

		disposable.add(
			hostListener.on('keydown', e => {
				host.keyDown(e, 'grid');
				this.shortcutService.keyDown(e);
			})
		);
	}
}
