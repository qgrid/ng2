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
import { VisibilityModel } from 'ng2-qgrid/core/visibility/visibility.model';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Log } from 'ng2-qgrid/core/infrastructure/log';
import { ViewCtrl } from 'ng2-qgrid/core/view/view.ctrl';
import { jobLine } from 'ng2-qgrid/core/services/job.line';
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
export class ViewCoreComponent extends NgComponent
	implements OnInit, DoCheck, AfterViewChecked {

	private ctrl: ViewCtrl;
	private sceneJob = jobLine(0);

	constructor(
		private root: RootService,
		private view: ViewCoreService,
		private grid: GridService,
		private zone: NgZone,
		private elementRef: ElementRef) {
		super();

	}

	ngOnInit() {
		this.root.markup['view'] = this.elementRef.nativeElement;

		// Views should be inited after `sceneChanged.watch` declaration
		// to persiste the right order of event sourcing.
		this.view.init(
			this.model,
			this.root.table,
			this.root.commandManager
		);

		const model = this.model;

		const gridService = this.grid.service(model);
		this.ctrl = new ViewCtrl(model, this.view, gridService);

		model.sceneChanged.watch(e => {
			const { round, status } = e.state;
			if (e.hasChanges('status')) {
				switch (status) {
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

			if (e.hasChanges('round') && round > 0) {
				if (!NgZone.isInAngularZone()) {
					// Run digest on the start of invalidate(e.g. for busy indicator)
					// and on the ned of invalidate(e.g. to build the DOM)
					this.zone.run(() => Log.info('grid.component', 'digest'));
				}
			}
		});
	}

	get model() {
		return this.root.model;
	}

	get visibility() {
		return this.model.visibility();
	}

	ngDoCheck() {
		const { status } = this.model.scene();
		if (status === 'stop') {
			this.ctrl.invalidate();
		}
	}

	ngAfterViewChecked() {
		this.sceneJob(() => {
			const model = this.model;
			const { round, status } = model.scene();
			if (round > 0 && status === 'start') {
				model.scene({
					round: 0,
					status: 'stop'
				}, {
						source: 'grid.component',
						behavior: 'core'
					});

				this.ctrl.invalidate();
			}
		});
	}
}
