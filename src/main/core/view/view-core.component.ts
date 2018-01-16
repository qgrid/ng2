import { Component, OnDestroy, OnInit, Optional, DoCheck, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NgComponent, RootService } from 'ng2-qgrid/infrastructure/component';
import { VisibilityModel } from 'ng2-qgrid/core/visibility/visibility.model';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { jobLine } from 'ng2-qgrid/core/services';
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

	@ViewChild('scrollX') scrollX: ElementRef;
	@ViewChild('scrollY') scrollY: ElementRef;

	constructor(
		private root: RootService,
		private view: ViewCoreService,
		private gridService: GridService,
		private zone: NgZone
	) {
		super();
	}

	ngOnInit() {
		super.ngOnInit();

		const model = this.root.model;
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

	ngAfterViewInit() {
		this.zone.runOutsideAngular(() => {
			const containerX = this.containerX;
			containerX.addEventListener('scroll', e => {
				const scroll = this.model.scroll;
				const left = containerX.scrollLeft;
				if (scroll().left !== left) {
					scroll({ left }, {
						source: 'view-core.component',
						behavior: 'core'
					});
				}
			});

			const containerY = this.containerY;
			containerY.addEventListener('scroll', e => {
				const scroll = this.model.scroll;
				const top = containerY.scrollTop;
				if (scroll().top !== top) {
					scroll({ top }, {
						source: 'view-core.component',
						behavior: 'core'
					});
				}
			});
		});
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

	ngAfterViewChecked() {
		const markup = this.root.markup;
		const body = markup['body'];
		if (body) {
			const offsetWidth = this.containerX.clientWidth - body.clientWidth;
			const offsetHeight = this.containerY.clientHeight - body.clientHeight;

			this.scrollX.nativeElement.style.width = (offsetWidth + body.scrollWidth) + 'px';
			this.scrollY.nativeElement.style.height = (offsetHeight + body.scrollHeight) + 'px';
		}

		const head = markup['head'];
		if (head) {
			this.containerY.style.top = head.clientHeight + 'px';
		}

		const foot = markup['foot'];
		if (foot) {
			this.containerY.style.bottom = foot.clientHeight + 'px';
		}

		const scene = this.model.scene;
		if (scene().status === 'start') {
			scene(
				{
					status: 'stop'
				},
				{
					source: 'view-core.component',
					behavior: 'core'
				}
			);
		}
	}

	get containerX() {
		return this.scrollX.nativeElement.parentElement;
	}

	get containerY() {
		return this.scrollY.nativeElement.parentElement;
	}
}
