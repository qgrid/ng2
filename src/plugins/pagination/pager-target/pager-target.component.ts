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

	private value: any;

	keyDown(e: KeyboardEvent) {
		e.preventDefault();

		const keyString = Shortcut.translate(e);
		const keyNumber = Number.parseInt(keyString) || 0;
		const total = this.total();

		if (keyString === 'enter') {
			this.model.pagination({current: this.value - 1});
		} else if (keyNumber <= total && keyNumber >= 1) {
			this.value = keyNumber;
		} else {
			this.value = 1;
		}
	}

	total() {
		const pagination = this.model.pagination();
		const count = pagination.count;
		const size = pagination.size;

		return count / size;
	}
}
