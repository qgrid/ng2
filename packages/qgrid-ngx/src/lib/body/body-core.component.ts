import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import { BodyHost, ColumnView, EventListener, EventManager, RowModelPin, SelectionState } from '@qgrid/core';
import { GridLet } from '../grid/grid-let';
import { GridModel } from '../grid/grid-model';
import { GridPlugin } from '../plugin/grid-plugin';
import { TableCoreService } from '../table/table-core.service';
import { BodyCoreService } from './body-core.service';
@Component({ 
	// tslint:disable-next-line
	selector: 'tbody[q-grid-core-body]',
	templateUrl: './body-core.component.html',
	providers: [GridPlugin, BodyCoreService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BodyCoreComponent implements OnInit {
	@Input() pin: RowModelPin = 'body';

	constructor(
		public $view: GridLet,
		public $table: TableCoreService,
		public $body: BodyCoreService,
		private elementRef: ElementRef,
		private zone: NgZone,
		private cd: ChangeDetectorRef,
		private plugin: GridPlugin
	) {
	}

	ngOnInit() {
		const { model, disposable, observeReply, observe } = this.plugin;
		const nativeElement = this.elementRef.nativeElement as HTMLElement;

		const host = new BodyHost(this.plugin);

		this.$body.pin = this.pin;

		const listener = new EventListener(this.elementRef.nativeElement, new EventManager(this));
		this.zone.runOutsideAngular(() => {
			const scrollSettings = { passive: true };
			disposable.add(
				listener.on('scroll', () =>
					host.scroll({
						scrollLeft: this.$table.pin === 'mid' ? nativeElement.scrollLeft : model.scroll().left,
						scrollTop: this.$body.pin === 'body' ? nativeElement.scrollTop : model.scroll().top
					}),
					scrollSettings
				));

			disposable.add(listener.on('wheel', e => host.wheel(e)));
			disposable.add(listener.on('mouseleave', e => host.mouseLeave(e)));
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

	mapToDataIndex(viewIndex: number) {
		return this.$view.scroll.y.container.position + viewIndex;
	}
}
