import { Event } from '@qgrid/core/event/event';
import { EventListener } from '@qgrid/core/event/event.listener';
import { EventManager } from '@qgrid/core/event/event.manager';
import { checkButtonCode, LEFT_BUTTON, MIDDLE_BUTTON } from '@qgrid/core/mouse/mouse.code';
import { elementFromPoint } from '@qgrid/core/services/dom';

export class BackdropPlugin {
	constructor(context) {
		this.closeEvent = new Event();

		const element = context.element;
		const listener = new EventListener(element, new EventManager(this));

		listener.on('mousedown', e => {
			if (checkButtonCode(e, LEFT_BUTTON) || checkButtonCode(e, MIDDLE_BUTTON)) {
				e.stopPropagation();
				element.remove();

				if (context.propagate !== false) {
					const target = elementFromPoint(e.clientX, e.clientY);
					const event = document.createEvent('MouseEvents');
					event.initEvent('mousedown', true, true);
					target.dispatchEvent(event);
				}

				this.closeEvent.emit(e);
			}
		});

		listener.on('keydown', e => context.onKeyDown({ $event: e }));
	}
}
