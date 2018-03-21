import { Component, Optional } from '@angular/core';
import { PluginComponent } from '../plugin.component';
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

	private value: number = this.current;

	keyDown(e: KeyboardEvent) {
		let code = Shortcut.translate(e);
		const value = this.value || 0;

		if (code.startsWith('numpad')) {
			code = code.slice(6);
		}

		switch (code) {
			case 'enter': {
				if (this.value) {
					this.model.pagination({current: this.value - 1});
				}
				break;
			}
			case 'left':
			case 'right':
			case 'backspace': {
				break;
			}
			default: {
				const digit = Number.parseInt(code);
				const total = this.total;
				const page = value + '' + digit || 0;
				const allowed = page >= 1 && page <= total && !isNaN(digit);

				if (!allowed) {
					e.preventDefault();
				}
			}
		}
	}

	get current() {
		return this.model.pagination().current + 1;
	}

	get total() {
		const pagination = this.model.pagination();
		const count = pagination.count;
		const size = pagination.size;

		return count / size;
	}
}
