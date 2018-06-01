import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Optional, Output, NgZone } from '@angular/core';
import { EventManager } from 'ng2-qgrid/core/infrastructure/event.manager';
import { EventListener } from 'ng2-qgrid/core/infrastructure/event.listener';
import { DragService } from 'ng2-qgrid/core/drag/drag.service';
import { GRID_PREFIX } from 'ng2-qgrid/core/definition';
import { Command } from 'ng2-qgrid/core/command/command';

@Directive({
	selector: '[q-grid-drop]'
})
export class DropDirective {
	private target: any;

	@Input('q-grid-drop') drop: Command<{ data: number, target: number }>;
	@Input('q-grid-drag-over') dragOver: Command<DragEvent>;

	constructor(private elementRef: ElementRef, zone: NgZone) {
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

	onDrop(e: DragEvent) {
		e.stopPropagation();

		this.elementRef.nativeElement.classList.remove(`${GRID_PREFIX}-dragover`);
		const eventArg = {
			data: DragService.data,
			target: this.target
		};

		if (this.drop.canExecute(eventArg)) {
			this.drop.execute(eventArg);
		}

		this.target = null;
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

		let effect = 'move';
		if (this.dragOver.canExecute(e)) {
			this.target = this.dragOver.execute(e);
		} else {
			effect = 'none';
		}

		e.dataTransfer.dropEffect = effect;
		return false;
	}

	onLeave() {
		this.elementRef.nativeElement.classList.remove(`${GRID_PREFIX}-dragover`);
	}
}
