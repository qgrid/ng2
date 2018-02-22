import { Directive, OnDestroy, AfterViewInit } from '@angular/core';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { Model } from 'ng2-qgrid/core/infrastructure/model';
import { Table } from 'ng2-qgrid/core/dom/table';
import { AutofocusView } from 'ng2-qgrid/plugin/autofocus/autofocus.view';

@Directive({
	selector: '[q-grid-autofocus]'
})
export class AutoFocusDirective implements AfterViewInit, OnDestroy {
	private autofocus: AutofocusView;
	
	constructor(private root: RootService) { }

	ngAfterViewInit() {
		this.autofocus = new AutofocusView(this.model, this.table, this.markup);
	}

	ngOnDestroy() {
		this.autofocus.dispose(); 
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
