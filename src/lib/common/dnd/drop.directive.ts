import { Directive, ElementRef, Input, OnInit, Optional, NgZone } from '@angular/core';
import { EventManager } from 'ng2-qgrid/core/infrastructure/event.manager';
import { EventListener } from 'ng2-qgrid/core/infrastructure/event.listener';
import { DragService } from 'ng2-qgrid/core/drag/drag.service';
import { GRID_PREFIX } from 'ng2-qgrid/core/definition';
import { Command } from 'ng2-qgrid/core/command/command';
import { no } from 'ng2-qgrid/core/utility/kit';
import { RootService } from '../../infrastructure/component/root.service';
import { NgComponent } from '../../infrastructure/component/ng.component';

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
export class DropDirective extends NgComponent implements OnInit {
	@Input('q-grid-drop-area') area: string;
	@Input('q-grid-drop-data') dropData: any;
	@Input('q-grid-drop') drop: Command<DropEventArg>;
	@Input('q-grid-drag-over') dragOver: Command<DropEventArg>;
	@Input('q-grid-drag-direction') dragDirection: 'x' | 'y' = 'y';

	constructor(
		@Optional() private root: RootService,
		private elementRef: ElementRef,
		private zone: NgZone
	) {
		super();

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
			this.using(this.root.model.dragChanged.on(e => {
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
			}));
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

		if (this.root && this.root.model.scene().status !== 'stop') {
			return false;
		}

		if (this.area !== DragService.area) {
			e.dataTransfer.dropEffect = 'none';
			return false;
		}

		const pos = this.getPosition(e);
		const path = this.getPath(pos);
		if (path.indexOf(DragService.element) >= 0) {
			return false;
		}

		const eventArg = {
			path,
			dragData: DragService.data,
			dropData: this.dropData,
			action: 'over',
			inAreaX: this.inAreaFactory(e, 'x'),
			inAreaY: this.inAreaFactory(e, 'y')
		};

		if (this.dragOver.canExecute(eventArg)) {
			this.dragOver.execute(eventArg);
			if (DragService.data !== eventArg.dragData) {
				DragService.data = eventArg.dragData;
			}

			e.dataTransfer.dropEffect = 'move';
		}

		return false;
	}

	onLeave() {
		this.elementRef.nativeElement.classList.remove(`${GRID_PREFIX}-dragover`);
	}

	private getPosition(e: DragEvent) {
		const start = DragService.startPosition;
		const src = start.rect;

		const offsetX = start.x - (src.left + src.width / 2);
		const offsetY = start.y - (src.top + src.height / 2);

		const { clientX, clientY } = e;

		const x = clientX - offsetX;
		const y = clientY - offsetY;

		return { x, y };
	}

	private getPath({ x, y }: { x: number, y: number }) {
		// Document.elementsFromPoint is not working with tr?
		// so we need to go through all parent.

		const path = [];
		let element = document.elementFromPoint(x, y);
		while (element) {
			path.push(element);
			element = element.parentElement;
		}

		return path;
	}

	private inAreaFactory(e: DragEvent, direction: 'x' | 'y') {
		const src = DragService.startPosition.rect;
		const { x, y } = this.getPosition(e);
		if (direction === 'y') {
			return (element: HTMLElement) => {
				const trg = element.getBoundingClientRect();
				// we are on the top of target
				if (src.top < trg.top) {
					return trg.bottom > y && y > trg.bottom - src.height;
				}

				// we are on the bottom of target
				return trg.top < y && y < trg.top + src.height;
			};
		}

		return (element: HTMLElement) => {
			const trg = element.getBoundingClientRect();

			// we are on the left of target
			if (src.left < trg.left) {
				return trg.right > x && x > trg.right - src.width;
			}

			// we are on the right of target
			return trg.left < x && x < trg.left + src.width;
		};
	}
}
