import { Component, OnInit, Optional } from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { RootService } from '../../infrastructure/component/root.service';
import { Shortcut } from 'ng2-qgrid/core/shortcut/shortcut';

@Component({
	selector: 'q-grid-pager-target',
	templateUrl: './pager-target.component.html'
})

export class PagerTargetComponent extends PluginComponent implements OnInit {
	constructor(@Optional() root: RootService) {
		super(root);
	}

	private value: number;

	ngOnInit() {
		this.value = this.current;
	}

	keyDown(e: KeyboardEvent) {
		let code = Shortcut.translate(e);
		if (code.startsWith('numpad')) {
			code = code.slice(6);
		}

		const value = this.value || 0;

		switch (code) {
			case 'enter': {
				if (value) {
					this.model.pagination({ current: value - 1 });
				}
				break;
			}
			case 'up': {
				if (value < this.total) {
					this.value = value + 1;
				}
				break;
			}
			case 'down': {
				if (value > 1) {
					this.value = value - 1;
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
				const page = Number.parseInt('' + value + digit);
				const min = 1;
				const max = this.total;
				const isValid = page >= min && page <= max && !isNaN(digit);

				if (!isValid) {
					page > this.total ? this.value = max : this.value = min;
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

		return size === 0
			? 0
			: Math.max(1, Math.ceil(count / size));
	}
}
