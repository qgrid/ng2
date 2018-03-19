import {
	Component,
	OnDestroy,
	OnInit,
	Optional,
	ElementRef,
	NgZone,
	DoCheck,
	AfterViewChecked
} from '@angular/core';
import { NgComponent } from 'ng2-qgrid/infrastructure/component/ng.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { VisibilityModel } from 'ng2-qgrid/core/visibility/visibility.model';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Log } from 'ng2-qgrid/core/infrastructure/log';
import { GridService } from 'ng2-qgrid/main/grid/grid.service';
import { CellService } from '../cell/cell.service';
import { ViewCoreService } from './view-core.service';
import { ViewCtrl } from 'ng2-qgrid/core/view/view.ctrl';

@Component({
	selector: 'q-grid-core-view',
	templateUrl: './view-core.component.html',
	providers: [CellService]
})
export class ViewCoreComponent extends NgComponent
	implements OnInit, OnDestroy, DoCheck, AfterViewChecked {

	private ctrl: ViewCtrl;

	constructor(
		private root: RootService,
		private view: ViewCoreService,
		private grid: GridService,
		private zone: NgZone) {
		super();
	}

	ngOnInit() {
		super.ngOnInit();

		// Views should be inited after `sceneChanged.watch` declaration
		// to persiste the right order of event sourcing.
		this.view.init();

		const model = this.model;

		const gridService = this.grid.service(model);
		this.ctrl = new ViewCtrl(model, this.view, gridService);

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
			}

			if (e.hasChanges('round') && e.state.round > 0) {
				if (!NgZone.isInAngularZone()) {
					// Run digest on the start of invalidate(e.g. for busy indicator)
					// and on the ned of invalidate(e.g. to build the DOM)
					this.zone.run(() => Log.info('grid.component', 'digest'));
				}
			}
		});

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
		this.ctrl.invalidate();
	}

	ngAfterViewChecked() {
		const model = this.model;
		const scene = model.scene();
		if (scene.round > 0 && scene.status === 'start') {
			model.scene({
				round: 0,
				status: 'stop'
			}, {
					source: 'grid.component',
					behavior: 'core'
				});
		}
	}
}
