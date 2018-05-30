import { Directive, OnDestroy, AfterViewInit } from '@angular/core';
import { RootService } from '../../infrastructure/component/root.service';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Table } from 'ng2-qgrid/core/dom/table';
import { AutofocusView } from 'ng2-qgrid/plugin/autofocus/autofocus.view';

@Directive({
	selector: '[q-grid-autofocus]'
})
export class AutoFocusDirective implements AfterViewInit {

	constructor(private root: RootService) { }

	ngAfterViewInit() {
		const autofocus = new AutofocusView(this.model, this.table, this.markup);
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
