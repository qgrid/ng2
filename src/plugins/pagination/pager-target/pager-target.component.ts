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

	keyDown(e: KeyboardEvent) {
		e.preventDefault();

		const code = Shortcut.translate(e);
		const digit = Number.parseInt(code);
		const total = this.total();
		const page = Number.parseInt(this.value + digit);
		const allowed = page >= 1 && page <= total;

		if (isNaN(digit)) {
			switch (code) {
				case 'enter': {
					if (this.value) {
						this.model.pagination({current: Number.parseInt(this.value) - 1});
						this.value = '';
					}
					break;
				}
				case 'backspace': {
					if (this.value !== '') {
						this.value = this.value.slice(0, this.value.length - 1);
					}
					break;
				}
			}
		}

		if (allowed && !isNaN(digit)) {
			this.value += digit;
		}
	}

	total() {
		const pagination = this.model.pagination();
		const count = pagination.count;
		const size = pagination.size;

		return count / size;
	}
}
