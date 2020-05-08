import { Component, OnInit, DoCheck, ChangeDetectorRef, NgZone } from '@angular/core';
import { VisibilityState } from '@qgrid/core/visibility/visibility.state';
import { ViewHost } from '@qgrid/core/view/view.host';
import { CellService } from '../cell/cell.service';
import { GridLet } from '../grid/grid-let';
import { Grid } from '../grid/grid';
import { GridPlugin } from '../plugin/grid-plugin';
import { TableCommandManager } from '@qgrid/core/command/table.command.manager';

@Component({
	selector: 'q-grid-core-view',
	templateUrl: './view-core.component.html',
	providers: [
		CellService,
		GridPlugin,
	]
})
export class ViewCoreComponent implements OnInit, DoCheck {
	private host: ViewHost;

	constructor(
		private view: GridLet,
		private plugin: GridPlugin,
		private qgrid: Grid,
		private cd: ChangeDetectorRef,
		private zone: NgZone
	) {
		zone
			.onStable
			.subscribe(() => {
				if (this.model) {
					const { scene } = this.model;
					const { status } = scene();
					if (status === 'push') {
						scene({
							status: 'stop'
						}, {
							source: 'grid.component',
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
		const { status } = this.model.scene();
		if (status === 'stop' && this.host) {
			this.host.invalidate();
		}
	}

	ngOnInit() {
		const { model, table, observe, observeReply } = this.plugin;
		
		this.view.scroll.y.settings.emit = f => {
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

					// Run digest on the start of invalidate(e.g. for busy indicator)
					// and on the ned of invalidate(e.g. to build the DOM)
					this.zone.run(() =>
						model.scene({
							status: 'push'
						}, {
							source: 'view-core.component',
							behavior: 'core'
						})
					);

					this.cd.detectChanges();
				}
			});

		observe(model.visibilityChanged)
			.subscribe(() => this.cd.detectChanges());

		const virtualBody = table.body as any;
		if (virtualBody.requestInvalidate) {
			virtualBody.requestInvalidate.on(() => this.host.invalidate());
		}
	}

	private get model() {
		return this.plugin.model;
	}

	get visibility(): VisibilityState {
		return this.model.visibility();
	}
}
