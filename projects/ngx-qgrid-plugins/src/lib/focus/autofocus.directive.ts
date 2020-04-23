import { Directive, AfterViewInit, Input } from '@angular/core';
import { GridRoot, Disposable } from '@qgrid/ngx';
import { AutofocusPlugin } from '@qgrid/plugins/autofocus/autofocus.plugin';

@Directive({
	selector: '[q-grid-autofocus]',
	providers: [Disposable]
})
export class AutoFocusDirective implements AfterViewInit {
	@Input('q-grid-autofocus') enabled: boolean;

	constructor(
		private root: GridRoot,
		private disposable: Disposable
	) { }

	ngAfterViewInit() {
		if (this.enabled !== false) {
			const { markup, model, table } = this.root;
			const plugin = new AutofocusPlugin(model, table, markup, this.disposable);
		}
	}
}
