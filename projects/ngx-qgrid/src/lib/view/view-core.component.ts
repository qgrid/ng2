import { Component, OnInit, DoCheck, ChangeDetectorRef, NgZone, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { CellClassService } from '../cell/cell-class.service';
import { CellTemplateService } from '../cell/cell-template.service';
import { Grid } from '../grid/grid';
import { GridPlugin } from '../plugin/grid-plugin';
import { ViewHost } from '@qgrid/core/view/view.host';
import { VisibilityState } from '@qgrid/core/visibility/visibility.state';
import { TableCommandManager } from '@qgrid/core/command/table.command.manager';
import { GridLet } from '../grid/grid-let';
import { EventManager } from '@qgrid/core/event/event.manager';
import { EventListener } from '@qgrid/core/event/event.listener';

@Component({
	selector: 'q-grid-core-view',
	templateUrl: './view-core.component.html',
	providers: [
		CellTemplateService,
		CellClassService,
		GridPlugin,
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewCoreComponent implements OnInit, DoCheck {
	private host: ViewHost;

	constructor(
		private plugin: GridPlugin,
		private qgrid: Grid,
		private cd: ChangeDetectorRef,
		private zone: NgZone,
		private view: GridLet,
		private elementRef: ElementRef,
	) {
		zone
			.onStable
			.subscribe(() => {
				const { model, table } = this.plugin;

				if (model) {
					const { status } = model.scene();
					if (status === 'push') {
						table.invalidate();

						model.scene({
							status: 'stop'
						}, {
							source: 'view-core.component',
							behavior: 'core'
						});

						if (this.host) {
							this.host.invalidate();
						}
					}
				}
			});
	}

	ngDoCheck() {
		if (this.host) {
			const { model } = this.plugin;
			if (model.scene().status === 'stop') {
				this.host.invalidate();
			}
		}
	}

	ngOnInit() {
		const {
			model,
			table,
			observeReply,
			observe,
			view,
			disposable,
			service
		} = this.plugin;

		// TODO: make it better
		table.box.markup.view = this.elementRef.nativeElement;
		const cmdManager = new TableCommandManager(f => f(), table);
		this.view.init(this.plugin, cmdManager);

		view.scroll.y.settings.emit = f => {
			f();

			this.cd.markForCheck();
			this.cd.detectChanges();
		};

		this.host = new ViewHost(this.plugin);

		observeReply(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('status') && e.state.status === 'pull') {
					this.cd.markForCheck();

					this.zone.run(() =>
						model.scene({
							status: 'push'
						}, {
							source: 'view-core.component',
							behavior: 'core'
						})
					);
				}
			});

		observe(model.styleChanged)
			.subscribe(() => this.host.invalidate());

		observe(model.layoutChanged)
			.subscribe(e => {
				if (e.hasChanges('rows')) {
					this.host.invalidate();
				}
			});

		observeReply(model.editChanged)
			.subscribe(e => {
				if (e.hasChanges('status')) {
					if (e.state.status === 'endBatch') {
						service.invalidate({
							source: 'view-core.component',
							why: 'refresh'
						});
					}
				}
			});

		const listener = new EventListener(this.elementRef.nativeElement, new EventManager(this));

		this.zone.runOutsideAngular(() => {
			disposable.add(listener.on('mousemove', e => this.host.mouseMove(e)));
			disposable.add(listener.on('mouseleave', e => this.host.mouseLeave(e)));
			disposable.add(listener.on('mouseup', e => this.host.mouseUp(e)));
		});

		disposable.add(
			listener.on('mousedown', e => this.host.mouseDown(e))
		);

		if (model.scroll().mode === 'virtual') {
			const asVirtualBody = table.body as any;
			if (asVirtualBody.requestInvalidate) {
				asVirtualBody.requestInvalidate.on(() => this.host.invalidate());
			}
		}
	}

	get visibility(): VisibilityState {
		const { model } = this.plugin;
		return model.visibility();
	}
}
