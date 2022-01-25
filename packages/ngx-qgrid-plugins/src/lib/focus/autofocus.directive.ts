import { AfterViewInit, Directive, Input } from '@angular/core';
import { GridPlugin } from '@qgrid/ngx';
import { AutofocusPlugin } from '@qgrid/plugins';

@Directive({
	selector: '[q-grid-autofocus]',
	providers: [GridPlugin]
})
export class AutoFocusDirective implements AfterViewInit {
	@Input('q-grid-autofocus') enabled!: boolean | string;

	constructor(
		private plugin: GridPlugin
	) { }

	ngAfterViewInit() {
		if (this.enabled !== false) {
			// tslint:disable-next-line:no-unused-expression
			new AutofocusPlugin(
				this.plugin
			);
		}
	}
}
