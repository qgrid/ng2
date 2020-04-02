import { Directive, AfterViewInit, Input } from '@angular/core';
import { RootService } from '../../infrastructure/component/root.service';
import { Disposable } from '../../infrastructure/disposable';
import { AutofocusView } from 'ng2-qgrid/plugin/autofocus/autofocus.view';

@Directive({
	selector: '[q-grid-autofocus]',
	providers: [Disposable]
})
export class AutoFocusDirective implements AfterViewInit {
	private view: AutofocusView;

	@Input('q-grid-autofocus') enabled: boolean;

	constructor(
		private root: RootService,
		private disposable: Disposable
	) { }

	ngAfterViewInit() {
		if (this.enabled !== false) {
			const { markup, model, table } = this.root;
			this.view = new AutofocusView(model, table, markup, this.disposable);
		}
	}
}
