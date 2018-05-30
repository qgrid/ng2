import { Component, ElementRef, Optional, Input, OnInit, OnDestroy } from '@angular/core';
import { NgComponent } from '../../infrastructure/component/ng.component';
import { GRID_PREFIX } from 'ng2-qgrid/core/definition';
import { Guard } from 'ng2-qgrid/core/infrastructure/guard';
import { RootService } from '../../infrastructure/component/root.service';
import { BoxCtrl } from 'ng2-qgrid/core/box/box.ctrl';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { ThemeService } from '../../template/theme.service';

@Component({
	selector: 'q-grid-box',
	template: '<ng-content></ng-content>'
})
export class BoxComponent extends NgComponent implements OnInit, OnDestroy {
	@Input('model') private boxModel: Model = null;

	constructor(
		@Optional() private root: RootService,
		private element: ElementRef,
		private theme: ThemeService) {
		super();
	}

	ngOnInit() {
		const ctrl = new BoxCtrl(this.model, this.element.nativeElement);
		this.initTheme();
	}

	initTheme() {
		const element = this.element.nativeElement;

		this.using(this.theme.changed.watch(e => {
			if (e) {
				element.classList.remove(`${GRID_PREFIX}-theme-${e.oldValue}`);
			}

			element.classList.add(`${GRID_PREFIX}-theme-${this.theme.name}`);
		}));
	}

	get model() {
		const model = this.boxModel || (this.root && this.root.model);
		Guard.notNull(model, 'model');
		return model;
	}
}
