import { Directive, ElementRef, Input, DoCheck } from '@angular/core';
import { RootService } from 'ng2-qgrid/infrastructure/component';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Table } from 'ng2-qgrid/core/dom/table';

@Directive({
	selector: '[q-grid-autofocus]'
})
export class AutoFocusDirective implements DoCheck {
	@Input('q-grid-autofocus') delay: number = 100;
	private isHandled = false;

	constructor(private root: RootService, private element: ElementRef) { }

	ngDoCheck() {
		if (this.isHandled) {
			return;
		}

		if (this.table.body.rowCount(0)) {
			const key = Object.keys(this.markup).find(p =>
				p.startsWith('body')
			);
			const element = this.markup[key];
			if (element) {
				this.element.nativeElement.focus();
			}

			const focusIndex = this.table.data
				.columns()
				.findIndex(c => c.canFocus);

			this.model.focus({
				rowIndex: 0,
				columnIndex: focusIndex
			});

			this.isHandled = true;
		}
	}

	get markup() {
		return this.root.markup;
	}

	get model() {
		return this.root.model;
	}

	get table() {
		return this.root.table;
	}
}
