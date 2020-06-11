import {
	Component,
	TemplateRef,
	ElementRef,
	Input,
	ViewChild,
	ChangeDetectionStrategy
} from '@angular/core';
import { GridError, ShortcutService } from '@qgrid/ngx';
import { EventListener } from '@qgrid/core/event/event.listener';
import { EventManager } from '@qgrid/core/event/event.manager';
import { GridPlugin } from '@qgrid/ngx';
import { Keyboard } from '@qgrid/core/keyboard/keyboard';

@Component({
	selector: 'q-grid-tab-trap',
	templateUrl: './tab-trap.component.html',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabTrapComponent {
	private isActivating = false;

	@ViewChild(TemplateRef, { static: true }) template: TemplateRef<any>;
	@Input() roundTrip = false;

	context: { $implicit: TabTrapComponent } = {
		$implicit: this
	};

	traps = new Map<string, any>();

	constructor(
		private plugin: GridPlugin,
		private shortcutService: ShortcutService,
		elementRef: ElementRef
	) {
		const listener = new EventListener(elementRef.nativeElement, new EventManager(this));
		listener.on('keydown', e => {
			const code = Keyboard.translate(e.code);
			if (code === 'tab' || code === 'shift+tab') {
				e.stopPropagation();
			}
		});
	}

	activate(target) {
		if (this.isActivating) {
			return;
		}

		this.isActivating = true;
		try {
			if (this.roundTrip) {
				this.goRound(target);
			} else {
				this.exit(target);
			}
		} finally {
			this.isActivating = false;
		}
	}

	exit(target) {
		const e = {
			code: 'Tab',
		};

		this.shortcutService.keyDown(e);
	}

	goRound(target) {
		switch (target) {
			case 'start': {
				const end = this.traps.get('end');
				end.focus();
				break;
			}
			case 'end': {
				const start = this.traps.get('start');
				start.focus();
				break;
			}
			default:
				throw new GridError('tab.trap', `Invalid target ${target}`);
		}
	}
}
