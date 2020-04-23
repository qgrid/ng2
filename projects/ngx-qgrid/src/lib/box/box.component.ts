import { Component, ElementRef, Optional, Input, OnInit } from '@angular/core';
import { GRID_PREFIX } from '@qgrid/core/definition';
import { Guard } from '@qgrid/core/infrastructure/guard';
import { BoxCtrl } from '@qgrid/core/box/box.ctrl';
import { GridRoot } from '../grid/grid-root';
import { GridModel } from '../grid/grid-model';
import { ThemeService } from '../theme/theme.service';
import { Disposable } from '../infrastructure/disposable';

@Component({
	selector: 'q-grid-box',
	templateUrl: './box.component.html',
	providers: [Disposable]
})
export class BoxComponent implements OnInit {
	@Input('model') private boxModel: GridModel = null;

	constructor(
		@Optional() private root: GridRoot,
		private elementRef: ElementRef,
		private disposable: Disposable,
		private theme: ThemeService
	) {
	}

	ngOnInit() {
		const ctrl = new BoxCtrl(this.model, this.elementRef.nativeElement);
		this.initTheme();
	}

	initTheme() {
		const element = this.elementRef.nativeElement;

		this.disposable.add(this.theme.changed.watch(e => {
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
