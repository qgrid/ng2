import { Component, OnInit, ElementRef, DoCheck, ChangeDetectorRef, NgZone } from '@angular/core';
import { VisibilityModel } from '@qgrid/core/visibility/visibility.model';
import { ViewCtrl } from '@qgrid/core/view/view.ctrl';
import { CellService } from '../cell/cell.service';
import { GridView } from '../grid/grid-view';
import { GridRoot } from '../grid/grid-root';
import { Grid } from '../grid/grid';
import { Disposable } from '../infrastructure/disposable';

@Component({
	selector: 'q-grid-core-view',
	templateUrl: './view-core.component.html',
	providers: [
		CellService,
		Disposable,
	]
})
export class ViewCoreComponent implements OnInit, DoCheck {
	private ctrl: ViewCtrl;

	constructor(
		private root: GridRoot,
		private view: GridView,
		private qgrid: Grid,
		private disposable: Disposable,
		private elementRef: ElementRef,
		private cd: ChangeDetectorRef,
		private zone: NgZone
	) {

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

					if (this.ctrl) {
						this.ctrl.invalidate();
					}
				}
			}
		});
	}

	ngDoCheck() {
		const { status } = this.model.scene();
		if (status === 'stop' && this.ctrl) {
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

		view.scroll.y.settings.emit = f => {
			f();

			this.cd.markForCheck();
			this.cd.detectChanges();
		};

		const gridService = this.qgrid.service(model);
		this.ctrl = new ViewCtrl(model, view, gridService);

		this.disposable.add(model.sceneChanged.watch(e => {
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
		}));

		this.disposable.add(model.visibilityChanged.on(() => this.cd.detectChanges()));

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
