import {PluginView} from '../plugin.view';
import {jobLine} from '../../core/services';
import {AppError} from '../../core/infrastructure';

export class FocusView extends PluginView {
	constructor(context) {
		super();

		this.element = context.element;
		this.targetSelector = context.targetSelector;
		this.job = jobLine(context.delay);
	}

	set() {
		if (this.element.getAttribute('tabindex') === null
		|| this.element.getAttribute('tabindex') !== '') {
			this.element.setAttribute('tabindex', -1);
		}

		this.job(() => {
			let targetElement = this.element;
			if (this.targetSelector) {
				const target = this.element.querySelector(this.targetSelector);
				if (target) {
					targetElement = target;
				}
				else {
					throw new AppError('focus', `Element "${this.targetSelector}" is not found`);
				}
			}

			targetElement.focus();
		});
	}
}