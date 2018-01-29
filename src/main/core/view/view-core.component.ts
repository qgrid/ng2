import {
	Component,
	OnDestroy,
	OnInit,
	Optional,
	DoCheck,
	ViewChild,
	ElementRef,
	NgZone,
	ChangeDetectorRef
} from '@angular/core';
import { NgComponent, RootService } from 'ng2-qgrid/infrastructure/component';
import { VisibilityModel } from 'ng2-qgrid/core/visibility/visibility.model';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { GridService } from 'ng2-qgrid/main/grid';
import { CellService } from '../cell';
import { ViewCoreService } from './view-core.service';
import { ViewCtrl } from 'ng2-qgrid/core/view/view.ctrl';

@Component({
	selector: 'q-grid-core-view',
	templateUrl: './view-core.component.html',
	providers: [CellService]
})
export class ViewCoreComponent extends NgComponent
	implements OnInit, OnDestroy, DoCheck {
	private ctrl: ViewCtrl;

	constructor(
		private root: RootService,
		private view: ViewCoreService,
		private gridService: GridService,
		private zone: NgZone,
		private changeDetector: ChangeDetectorRef
	) {
		super();
	}

	ngOnInit() {
		super.ngOnInit();

		const model = this.root.model;

		model.sceneChanged.watch(e => {
			if (e.hasChanges('status')) {
				switch (e.state.status) {
					case 'start': {
						model.progress({ isBusy: true });
						break;
					}
					case 'stop': {
						model.progress({ isBusy: false });
						break;
					}
				}

				// Run digest on the start of invalidate(e.g. for busy indicator)
				// and on the ned of invalidate(e.g. to build the DOM)
				this.changeDetector.detectChanges();
			}
		});

		// Views should be inited after `sceneChanged.watch` declaration
		// to persiste the right order of event sourcing.
		this.view.init();

		const gridService = this.gridService.service(model);
		this.ctrl = new ViewCtrl(model, this.view, gridService);

	}

	ngOnDestroy() {
		super.ngOnDestroy();

		this.view.destroy();
		this.ctrl.dispose();
	}

	get model() {
		return this.root.model;
	}

	get visibility() {
		return this.model.visibility();
	}

	ngDoCheck() {
		const style = this.view.style;
		if (style.needInvalidate()) {
			const rowMonitor = style.monitor.row;
			const cellMonitor = style.monitor.cell;

			const domCell = cellMonitor.enter();
			const domRow = rowMonitor.enter();
			try {
				style.invalidate(domCell, domRow);
			} finally {
				rowMonitor.exit();
				cellMonitor.exit();
			}
		}
	}
}
