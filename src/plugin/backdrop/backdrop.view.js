import { Event } from '../../core/infrastructure/event';
import { EventListener } from '../../core/infrastructure/event.listener';
import { EventManager } from '../../core/infrastructure/event.manager';
import { checkButtonCode, LEFT_BUTTON, MIDDLE_BUTTON } from '../../core/mouse/mouse.code';

export class BackdropView {
	constructor(context) {
		this.closeEvent = new Event();

		const element = context.element;
		const listener = new EventListener(element, new EventManager(this));

		listener.on('mouseup', e => {
			if (checkButtonCode(e, LEFT_BUTTON) || checkButtonCode(e, MIDDLE_BUTTON)) {

				e.stopPropagation();
				element.remove();

				if (context.propagate !== false) {
					const target = document.elementFromPoint(e.clientX, e.clientY);
					const event = document.createEvent('MouseEvents');
					event.initEvent('mouseup', true, true);
					target.dispatchEvent(event);
				}

				this.closeEvent.emit(e);

			}
		});

		listener.on('keydown', e => context.onKeyDown({ $event: e }));
	}
}
