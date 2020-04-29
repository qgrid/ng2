import { Component, ElementRef, OnInit, NgZone, Input, ChangeDetectorRef } from '@angular/core';
import { EventListener } from '@qgrid/core/event/event.listener';
import { EventManager } from '@qgrid/core/event/event.manager';
import { ColumnView } from '@qgrid/core/scene/view/column.view';
import { SelectionState } from '@qgrid/core/selection/selection.state';
import { GridModel } from '../grid/grid-model';
import { BodyHost } from '@qgrid/core/body/body.host';
import { GridLet } from '../grid/grid-let';
import { TableCoreService } from '../table/table-core.service';
import { GridPlugin } from '../plugin/grid-plugin';

@Component({
	// tslint:disable-next-line
	selector: 'tbody[q-grid-core-body]',
	templateUrl: './body-core.component.html',
	providers: [GridPlugin]
})
export class BodyCoreComponent implements OnInit {
	@Input() pin = 'body';

	columnId: (index: number, item: ColumnView) => any;
	rowId: (index: number, row: any) => any;

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
		const { model, disposable, observeReply } = this.plugin;
		const { id } = model.data();

		this.rowId = id.row;
		this.columnId = (index, columnView) => id.column(index, columnView.model);

		const nativeElement = this.elementRef.nativeElement as HTMLElement;

		const host = new BodyHost(this.plugin);
		const listener = new EventListener(nativeElement, new EventManager(this));

		this.zone.runOutsideAngular(() => {
			const scrollSettings = { passive: true };
			disposable.add(
				listener.on('scroll', () =>
					host.scroll({
						scrollLeft: this.$table.pin ? model.scroll().left : nativeElement.scrollLeft,
						scrollTop: nativeElement.scrollTop
					}),
					scrollSettings
				));

			disposable.add(listener.on('wheel', e => host.wheel(e)));
			disposable.add(listener.on('mousemove', host.mouseMove.bind(host)));
			disposable.add(listener.on('mouseleave', host.mouseLeave.bind(host)));
			disposable.add(listener.on('mouseup', e => host.mouseUp(e)));
			disposable.add(listener.on('mousedown', e => {
				this.cd.markForCheck();
				this.zone.run(() => host.mouseDown(e));
			}));
		});

		observeReply(model.dataChanged)
			.subscribe(e => {
				if (e.hasChanges('id')) {
					this.rowId = e.state.id.row;
					const columnId = e.state.id.column;
					this.columnId = (index, columnView) => columnId(index, columnView.model);
				}
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
	}

	get selection(): SelectionState {
		return this.model.selection();
	}

	get model(): GridModel {
		return this.plugin.model;
	}
}
