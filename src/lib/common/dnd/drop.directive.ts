import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, NgZone } from '@angular/core';
import { EventManager } from 'ng2-qgrid/core/infrastructure/event.manager';
import { EventListener } from 'ng2-qgrid/core/infrastructure/event.listener';
import { DragService } from 'ng2-qgrid/core/drag/drag.service';
import { GRID_PREFIX } from 'ng2-qgrid/core/definition';
import { Command } from 'ng2-qgrid/core/command/command';
import { isUndefined, no } from 'ng2-qgrid/core/utility/kit';
import { RootService } from '../../infrastructure/component/root.service';
import { Action } from 'ng2-qgrid';

export interface DropEventArg {
	event: DragEvent;
	dragData: any;
	dropData: any;
	action: 'over' | 'drop' | 'end';

	inAreaY(element: HTMLElement);
	inAreaX(element: HTMLElement);
}

@Directive({
	selector: '[q-grid-drop]'
})
export class DropDirective implements OnInit {
	@Input('q-grid-drop-area') area: string;
	@Input('q-grid-drop-data') dropData: any;
	@Input('q-grid-drop') drop: Command<{ DropEventArg }>;
	@Input('q-grid-drag-over') dragOver: Command<{ DropEventArg }>;

	constructor(@Optional() private root: RootService, private elementRef: ElementRef, private zone: NgZone) {
		const element = elementRef.nativeElement;
		const listener = new EventListener(element, new EventManager(this));

		element.classList.add(`${GRID_PREFIX}-can-drop`);
		zone.runOutsideAngular(() => {
			listener.on('dragenter', this.onEnter);
			listener.on('dragover', this.onOver);
			listener.on('dragleave', this.onLeave);
		});

		listener.on('drop', this.onDrop);
	}

	ngOnInit() {
		if (this.root) {
			this.root.model.dragChanged.on(e => {
				if (e.hasChanges('isActive') && !e.state.isActive) {
					const eventArg = {
						event: null,
						dragData: DragService.data,
						dropData: this.dropData,
						action: 'end',
						inAreaX: no,
						inAreaY: no
					};

					if (this.drop.canExecute(eventArg)) {
						this.drop.execute(eventArg);
					}
				}
			});
		}
	}

	onDrop(e: DragEvent) {
		e.stopPropagation();

		this.elementRef.nativeElement.classList.remove(`${GRID_PREFIX}-dragover`);
		const eventArg = {
			event: e,
			dragData: DragService.data,
			dropData: this.dropData,
			action: 'drop',
			inAreaX: this.inAreaFactory(e, 'x'),
			inAreaY: this.inAreaFactory(e, 'y')
		};

		if (this.drop.canExecute(eventArg)) {
			this.drop.execute(eventArg);
		}

		return false;
	}

	onEnter(e: DragEvent) {
		e.preventDefault();

		this.elementRef.nativeElement.classList.add(`${GRID_PREFIX}-dragover`);
		e.dataTransfer.dropEffect = 'move';
		return false;
	}

	onOver(e: DragEvent) {
		e.preventDefault();

		const eventArg = {
			event: e,
			dragData: DragService.data,
			dropData: this.dropData,
			action: 'over',
			inAreaX: this.inAreaFactory(e, 'x'),
			inAreaY: this.inAreaFactory(e, 'y')
		};

		let effect = 'move';
		if (this.area === DragService.area && this.dragOver.canExecute(eventArg)) {
			this.dragOver.execute(eventArg);
			if (DragService.data !== eventArg.dragData) {
				DragService.data = eventArg.dragData;
			}
		} else {
			effect = 'none';
		}

		e.dataTransfer.dropEffect = effect;
		return false;
	}

	onLeave() {
		this.elementRef.nativeElement.classList.remove(`${GRID_PREFIX}-dragover`);
	}

	private inAreaFactory(e: DragEvent, direction: 'x' | 'y') {
		if (direction === 'y') {
			return (element: HTMLElement) => {
				const src = (DragService.element || e.srcElement).getBoundingClientRect();
				const trg = element.getBoundingClientRect();
				return e.clientY > trg.top + src.height / 2
					|| e.clientY < trg.bottom - src.height / 2;
			};
		}

		return (element: HTMLElement) => {
			const src = (DragService.element || e.srcElement).getBoundingClientRect();
			const trg = element.getBoundingClientRect();
			return e.clientX > trg.left + src.width / 2
				|| e.clientX < trg.right - src.width / 2;
		};
	}
}
