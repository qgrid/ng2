import {PluginView} from '../plugin.view';
import {Event, EventListener, EventManager} from '../../core/infrastructure';

const MOUSE_LEFT_BUTTON = 1;
const MOUSE_WHEEL_BUTTON = 2;

export class BackdropView extends PluginView {
	constructor(context) {
		super(context);

		this.closeEvent = new Event();

		const element = context.element;
		const listener = new EventListener(element, new EventManager(this));

		this.using(listener.on('mouseup', e => {

			if (e.which === MOUSE_LEFT_BUTTON || e.which === MOUSE_WHEEL_BUTTON) {

				e.stopPropagation();
				element.remove();

				if (context.propagate !== false) {
					const target = document.elementFromPoint(e.clientX, e.clientY);
					target.click();
				}

				this.closeEvent.emit(e);

			}
		}));

		this.using(listener.on('keydown', e => {
			context.onKeyDown({$event: e});
		}));
	}
}
