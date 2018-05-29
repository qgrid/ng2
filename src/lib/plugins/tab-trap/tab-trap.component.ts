import {
	Component,
	Optional,
	TemplateRef,
	ContentChild,
	ElementRef,
	Input,
} from '@angular/core';
import { PluginComponent } from '../plugin.component';
import { RootService } from '../../infrastructure/component/root.service';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { EventListener } from 'ng2-qgrid/core/infrastructure/event.listener';
import { EventManager } from 'ng2-qgrid/core/infrastructure/event.manager';
import { Shortcut } from 'ng2-qgrid/core/shortcut/shortcut';

@Component({
	selector: 'q-grid-tab-trap',
	templateUrl: './tab-trap.component.html'
})
export class TabTrapComponent extends PluginComponent {
	@ContentChild(TemplateRef) public template: TemplateRef<any>;
	@Input() public roundTrip = false;

	private traps = new Map<string, any>();
	private isActivating = false;

	constructor(root: RootService, element: ElementRef) {
		super(root);

		const listener = new EventListener(element.nativeElement, new EventManager(this));
		listener.on('keydown', e => {
			const code = Shortcut.translate(e);
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
			key: 'Tab',
			keyCode: 9,
			shiftKey: target === 'start'
		};

		const model = this.root.model;
		const shortcut = model.action().shortcut;
		shortcut.keyDown(e, 'tab-trap');
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
				throw new AppError('tab.trap', `Invalid target ${target}`);
		}
	}
}
