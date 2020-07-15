import {
	Component,
	ElementRef,
	OnInit,
	NgZone,
	Input,
	ChangeDetectorRef,
	ChangeDetectionStrategy
} from '@angular/core';
import { ColumnView } from '@qgrid/core/scene/view/column.view';
import { EventListener } from '@qgrid/core/event/event.listener';
import { EventManager } from '@qgrid/core/event/event.manager';
import { GridLet } from '../grid/grid-let';
import { GridModel } from '../grid/grid-model';
import { GridPlugin } from '../plugin/grid-plugin';
import { SelectionState } from '@qgrid/core/selection/selection.state';
import { TableCoreService } from '../table/table-core.service';
import { MOUSE_WHEEL_COMMAND_KEY, HIGHLIGHT_CELL_COMMAND_KEY, SCROLL_COMMAND_KEY } from '@qgrid/core/command-bag/command.bag';

const SCROLL_SETTINGS = { passive: true };

@Component({
	// tslint:disable-next-line
	selector: 'tbody[q-grid-core-body]',
	templateUrl: './body-core.component.html',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyCoreComponent implements OnInit {
	@Input() pin = 'body';

	constructor(
		public $view: GridLet,
		public $table: TableCoreService,
		private elementRef: ElementRef,
		private zone: NgZone,
		private cd: ChangeDetectorRef,
		private plugin: GridPlugin
	) {
	}

	ngOnInit() {
		const { model, disposable, observeReply, observe, commandPalette } = this.plugin;
		const nativeElement = this.elementRef.nativeElement as HTMLElement;
		const listener = new EventListener(nativeElement, new EventManager(this));

		this.zone.runOutsideAngular(() => {
			disposable.add(
				listener.on('scroll', () => {
					const scroll = commandPalette.get(SCROLL_COMMAND_KEY);
					const pos: [number, number] = [
						this.$table.pin === 'mid'
							? nativeElement.scrollLeft : model.scroll().left,
						nativeElement.scrollTop
					];

					if (scroll.canExecute(pos) === true) {
						scroll.execute(pos);
					}
				}, SCROLL_SETTINGS));

			disposable.add(
				listener.on('wheel', e => {
					const wheel = commandPalette.get(MOUSE_WHEEL_COMMAND_KEY);
					if (wheel.canExecute(e.deltaY) === true) {
						wheel.execute(e.deltaY);
					}
				}));

			disposable.add(
				listener.on('mouseleave', () => {
					const clearHighlight = commandPalette.get(HIGHLIGHT_CELL_COMMAND_KEY);
					if (clearHighlight.canExecute() === true) {
						clearHighlight.execute();
					}
				}));
		});

		observeReply(model.sceneChanged)
			.subscribe(e => {
				if (model.grid().interactionMode === 'detached') {
					if (e.hasChanges('status')) {
						switch (e.state.status) {
							case 'stop':
								this.cd.detach();
								break;
							case 'start':
								this.cd.reattach();
								break;
						}
					}
				}
			});

		observe(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('status') && e.state.status === 'push') {
					this.cd.markForCheck();
				}
			});
	}

	// @deprecated
	get selection(): SelectionState {
		return this.model.selection();
	}

	get model(): GridModel {
		return this.plugin.model;
	}

	columnId(index: number, item: ColumnView) {
		return item.model.key;
	}

	rowId(index: number, row: any) {
		return index;
	}
}
