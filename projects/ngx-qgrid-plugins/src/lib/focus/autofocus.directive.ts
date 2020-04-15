import { Directive, AfterViewInit, Input } from '@angular/core';
import { GridRoot, Disposable } from 'ngx-qgrid';
import { AutofocusView } from '@qgrid/plugins/autofocus/autofocus.view';

@Directive({
	selector: '[q-grid-autofocus]',
	providers: [Disposable]
})
export class AutoFocusDirective implements AfterViewInit {
	private view: AutofocusView;

	@Input('q-grid-autofocus') enabled: boolean;

	constructor(
		private root: GridRoot,
		private disposable: Disposable
	) { }

	ngAfterViewInit() {
		if (this.enabled !== false) {
			const { markup, model, table } = this.root;
			this.view = new AutofocusView(model, table, markup, this.disposable);
		}
	}
}
