import { Directive, AfterViewInit, Input } from '@angular/core';
import { GridRoot, GridPlugin } from '@qgrid/ngx';
import { AutofocusPlugin } from '@qgrid/plugins/autofocus/autofocus.plugin';

@Directive({
	selector: '[q-grid-autofocus]',
	providers: [GridPlugin]
})
export class AutoFocusDirective implements AfterViewInit {
	@Input('q-grid-autofocus') enabled: boolean;

	constructor(
		private root: GridRoot,
		private plugin: GridPlugin
	) { }

	ngAfterViewInit() {
		if (this.enabled !== false) {
			// tslint:disable-next-line:no-unused-expression
			new AutofocusPlugin(
				this.plugin,
				this.root.markup
			);
		}
	}
}
