import { Event } from '../../core/infrastructure/event';
import { EventListener } from '../../core/infrastructure/event.listener';
import { EventManager } from '../../core/infrastructure/event.manager';

const MOUSE_LEFT_BUTTON = 1;
const MOUSE_WHEEL_BUTTON = 2;

export class BackdropView {
	constructor(context) {
		this.closeEvent = new Event();

		const element = context.element;
		const listener = new EventListener(element, new EventManager(this));

		listener.on('mouseup', e => {
			if (e.which === MOUSE_LEFT_BUTTON || e.which === MOUSE_WHEEL_BUTTON) {

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
