import { Directive, AfterViewInit } from '@angular/core';
import { RootService } from '../../infrastructure/component/root.service';
import { AutofocusView } from 'ng2-qgrid/plugin/autofocus/autofocus.view';

@Directive({
	selector: '[q-grid-autofocus]'
})
export class AutoFocusDirective implements AfterViewInit {

	constructor(private root: RootService) { }

	ngAfterViewInit() {
		const {markup, model, table} = this.root;
		const autofocus = new AutofocusView(model, table, markup);
	}
}
