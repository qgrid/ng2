import { Component, OnInit, ElementRef, NgZone, DoCheck, ChangeDetectorRef } from '@angular/core';
import { VisibilityModel } from 'ng2-qgrid/core/visibility/visibility.model';
import { ViewCtrl } from 'ng2-qgrid/core/view/view.ctrl';
import { CellService } from '../cell/cell.service';
import { ViewCoreService } from './view-core.service';
import { NgComponent } from '../../../infrastructure/component/ng.component';
import { RootService } from '../../../infrastructure/component/root.service';
import { GridService } from '../../../main/grid/grid.service';

@Component({
	selector: 'q-grid-core-view',
	templateUrl: './view-core.component.html',
	providers: [CellService]
})
export class ViewCoreComponent extends NgComponent implements OnInit, DoCheck {
	private ctrl: ViewCtrl;

	constructor(
		private root: RootService,
		private view: ViewCoreService,
		private grid: GridService,
		private zone: NgZone,
		private elementRef: ElementRef,
		private cd: ChangeDetectorRef
	) {
		super();

		zone.onStable.subscribe(() => {
			if (this.root.isReady) {
				const { scene } = this.model;
				const { status } = scene();
				if (status === 'push') {
					scene({
						status: 'stop'
					}, {
							source: 'grid.component',
							behavior: 'core'
						});

					this.ctrl.invalidate();
				}
			}
		});
	}

	ngDoCheck() {
		const { status } = this.model.scene();
		if (status === 'stop') {
			this.ctrl.invalidate();
		}
	}

	ngOnInit() {
		const { model, root, view } = this;

		root.markup['view'] = this.elementRef.nativeElement;

		// Views need to be init after `sceneChanged.watch` declaration
		// to persist the right order of event sourcing.
		view.init(
			model,
			root.table,
			root.commandManager
		);

		const gridService = this.grid.service(model);
		this.ctrl = new ViewCtrl(model, view, gridService);

		model.sceneChanged.watch(e => {
			if (e.hasChanges('status')) {
				if (e.state.status === 'pull') {
					this.cd.markForCheck();

					// Run digest on the start of invalidate(e.g. for busy indicator)
					// and on the ned of invalidate(e.g. to build the DOM)
					this.zone.run(() =>
						model.scene({
							status: 'push'
						}, {
								source: 'view-core.component',
								behavior: 'core'
							}));
				}
			}
		});

		const virtualBody = this.root.table.body as any;
		if (virtualBody.requestInvalidate) {
			virtualBody.requestInvalidate.on(() => this.ctrl.invalidate());
		}
	}

	private get model() {
		return this.root.model;
	}

	get visibility(): VisibilityModel {
		return this.model.visibility();
	}
}
