import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Shortcut } from '@qgrid/core/shortcut/shortcut';
import { GridPlugin } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-pager-target',
	templateUrl: './pager-target.component.html',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagerTargetComponent implements OnInit {
	private value: number;

	context: { $implicit: PagerTargetComponent } = {
		$implicit: this
	};

	constructor(private plugin: GridPlugin) {
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
				const digit = Number.parseInt(code, 10);
				const page = Number.parseInt('' + value + digit, 10);
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
