import { GRID_PREFIX } from '../definition';

export class BoxCtrl {
	constructor(model, element) {
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