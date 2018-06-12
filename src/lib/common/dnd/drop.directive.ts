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
	path: HTMLElement[];
	dragData: any;
	dropData: any;
	action: string; // 'over' | 'drop' | 'end';

	inAreaY(element: HTMLElement): boolean;
	inAreaX(element: HTMLElement): boolean;
}

@Directive({
	selector: '[q-grid-drop]'
})
export class DropDirective implements OnInit {
	@Input('q-grid-drop-area') area: string;
	@Input('q-grid-drop-data') dropData: any;
	@Input('q-grid-drop') drop: Command<DropEventArg>;
	@Input('q-grid-drag-over') dragOver: Command<DropEventArg>;
	@Input('q-grid-drag-direction') dragDirection: 'x' | 'y' = 'y';

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
				if (e.hasChanges('isActive')) {
					if (!e.state.isActive) {
						const eventArg = {
							path: [],
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
				}
			});
		}
	}

	onDrop(e: DragEvent) {
		e.stopPropagation();

		this.elementRef.nativeElement.classList.remove(`${GRID_PREFIX}-dragover`);
		const eventArg = {
			path: (e as any).path,
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

		// const src = DragService.element || e.srcElement;

		// const { clientX, clientY } = e;
		// const { left, top, width, height } = src.getBoundingClientRect();

		// const cx = left + width / 2;
		// const cy = top + height / 2;

		// const path0 = document.elementsFromPoint(clientX + width /2, clientY - height/2);
		// const path1 = document.elementsFromPoint(clientX - , y1);


		// const { x, y } = DragService.startPosition;
		// const offsetX = e.clientX - x;
		// let px;
		// let py;
		// if (offsetX > 0) {
		// 	px = rect.bottom 
		// } else {

		// }
		// const cx = DragService.startPosition.x;
		// const x0 = left;
		// const y0 = top + height / 2;
		// const x1 = right;
		// const y1 = top + height / 2;


		const eventArg = {
			path: (e as any).path,
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
				return true;

				// const src = (DragService.element || e.srcElement).getBoundingClientRect();
				// const trg = element.getBoundingClientRect();
				// return e.clientY > trg.top + src.height / 2
				// 	|| e.clientY < trg.bottom - src.height / 2;
			};
		}

		return (element: HTMLElement) => {
			return true;
			// const src = DragService.element || e.srcElement;
			// const trg = element;
			// if (src === trg) {
			// 	return false;
			// }

			// const srcRect = src.getBoundingClientRect();
			// const trgRect = trg.getBoundingClientRect();
			// //	const width = Math.max(srcRect.width, trgRect.width);
			// const width = srcRect.width;
			// console.log(width);
			// console.log(e.clientX);
			// console.log(e.clientX + ' > ' + (trgRect.left + width / 2));
			// console.log(e.clientX + ' < ' + (trgRect.right - width / 2));
			// console.log(srcRect);
			// console.log(trgRect);
			// console.log(e);

			// return e.clientX > trgRect.left + width / 2
			// 	|| e.clientX < trgRect.right - width / 2;
		};
	}
}
