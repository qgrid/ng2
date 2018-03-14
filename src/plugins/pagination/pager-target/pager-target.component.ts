import { Component, Optional } from '@angular/core';
import { PluginComponent } from '../../plugin.component';
import { RootService } from 'ng2-qgrid/infrastructure/component/root.service';
import { Shortcut } from 'ng2-qgrid/core/shortcut/shortcut';

@Component({
	selector: 'q-grid-pager-target',
	templateUrl: './pager-target.component.html'
})

export class PagerTargetComponent extends PluginComponent {
	constructor(@Optional() root: RootService) {
		super(root);
	}

	private value = '';
	private input: any;

	keyDown(e: KeyboardEvent) {
		e.preventDefault();

		const code = Shortcut.translate(e);
		const digit = Number.parseInt(code);
		const total = this.total();
		const firstTimeInput = this.value === '';
		const candidate = Number.parseInt(this.value + digit);
		const allowed =
			candidate >= 1 &&
			candidate <= total &&
			(!firstTimeInput ? candidate <= total : true);

		if (code === 'enter' && this.input) {
			this.model.pagination({current: Number.parseInt(this.input) - 1});
			this.input = '';
			this.value = '';
		} else if (code === 'backspace' && this.value !== '') {
			this.value = this.value.slice(0, this.value.length - 1);
			this.input = this.value;
		} else {
			if (allowed) {
				this.value += digit;
				this.input = this.value;
			}
		}
	}

	total() {
		const pagination = this.model.pagination();
		const count = pagination.count;
		const size = pagination.size;

		return count / size;
	}
}
