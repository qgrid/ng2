import { Component, OnInit, Optional } from '@angular/core';
import { Shortcut } from 'ng2-qgrid/core/shortcut/shortcut';
import { PluginService } from '../plugin.service';

@Component({
	selector: 'q-grid-pager-target',
	templateUrl: './pager-target.component.html',
	providers: [PluginService]
})
export class PagerTargetComponent implements OnInit {
	private value: number;

	context: { $implicit: PagerTargetComponent } = {
		$implicit: this
	};

	constructor(private plugin: PluginService) {
	}

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
					this.plugin.model.pagination({ current: value - 1 }, { source: 'pager-target.component' });
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
		return this.plugin.model.pagination().current + 1;
	}

	get total() {
		const pagination = this.plugin.model.pagination();
		const count = pagination.count;
		const size = pagination.size;

		return size === 0 ? 0 : Math.max(1, Math.ceil(count / size));
	}
}
