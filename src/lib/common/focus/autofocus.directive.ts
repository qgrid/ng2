import { Directive, AfterViewInit, Input } from '@angular/core';
import { RootService } from '../../infrastructure/component/root.service';
import { AutofocusView } from 'ng2-qgrid/plugin/autofocus/autofocus.view';

@Directive({
	selector: '[q-grid-autofocus]'
})
export class AutoFocusDirective implements AfterViewInit {
	@Input('q-grid-autofocus') enabled = true;

	constructor(private root: RootService) { }

	ngAfterViewInit() {
		if (this.enabled) {
			const { markup, model, table } = this.root;
			const autofocus = new AutofocusView(model, table, markup);
		}
	}
}
