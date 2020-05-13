import { Component, OnInit, DoCheck, ChangeDetectorRef, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { CellClassService } from '../cell/cell-class.service';
import { CellTemplateService } from '../cell/cell-template.service';
import { Grid } from '../grid/grid';
import { GridPlugin } from '../plugin/grid-plugin';
import { ViewHost } from '@qgrid/core/view/view.host';
import { VisibilityState } from '@qgrid/core/visibility/visibility.state';

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
		private zone: NgZone
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
		const { model, table, observeReply, observe, view } = this.plugin;

		view.scroll.y.settings.emit = f => {
			f();

			this.cd.markForCheck();
			this.cd.detectChanges();
		};

		const gridService = this.qgrid.service(model);
		this.host = new ViewHost(this.plugin, gridService);

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

		const asVirtualBody = table.body as any;
		if (asVirtualBody.requestInvalidate) {
			asVirtualBody.requestInvalidate.on(() => this.host.invalidate());
		}
	}

	get visibility(): VisibilityState {
		const { model } = this.plugin;
		return model.visibility();
	}
}
