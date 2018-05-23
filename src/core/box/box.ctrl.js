import { GRID_PREFIX } from '../definition';
import { View } from '../view/view';

export class BoxCtrl extends View {
	constructor(model, element) {
		super(model);

		element.classList.add(GRID_PREFIX);

		model.dragChanged.watch(e => {
			if (e.hasChanges('isActive')) {
				if (model.drag().isActive) {
					element.classList.add(`${GRID_PREFIX}-drag`);
				}
				else {
					element.classList.remove(`${GRID_PREFIX}-drag`);
				}
			}
		});
	}
}