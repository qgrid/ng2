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

	private value: any[] = [];
	private input: any;

	keyDown(e: KeyboardEvent) {
		e.preventDefault();

		const code = Shortcut.translate(e);
		const digit = Number.parseInt(code) || 0;
		const total = this.total();
		const firstTimeInput = this.value.length === 0;

		const copy = this.value.slice();
		copy.push(digit);
		const candidate = Number.parseInt(copy.join(''));

		const allowed =
			candidate >= 1 &&
			digit <= total &&
			(!firstTimeInput ? candidate <= total : true);

		if (code === 'enter') {
			this.model.pagination({current: this.input - 1});
			this.input = '';
			this.value = [];
		} else if (code === 'backspace') {
			if (this.value.length !== 0) {
				this.value.pop();
				this.input = Number.parseInt(this.value.join(''));
			}
		} else {
			if (allowed) {
				this.value.push(digit);
				this.input = Number.parseInt(this.value.join(''));
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
