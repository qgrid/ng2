import { Directive, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { RootService } from '../../infrastructure/component/root.service';
import { AutofocusView } from 'ng2-qgrid/plugin/autofocus/autofocus.view';

@Directive({
	selector: '[q-grid-autofocus]'
})
export class AutoFocusDirective implements AfterViewInit, OnDestroy {
	private view: AutofocusView;

	@Input('q-grid-autofocus') enabled: boolean;

	constructor(private root: RootService) { }

	ngAfterViewInit() {
		if (this.enabled !== false) {
			const { markup, model, table } = this.root;
			this.view = new AutofocusView(model, table, markup);
		}
	}

	ngOnDestroy() {
		if (this.view) {
			this.view.dispose();
		}
	}
}
