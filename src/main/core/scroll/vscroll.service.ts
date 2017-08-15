import {Event} from '@grid/core/infrastructure';

export class VScrollService {
	factory() {
		return {
			settings: {},
			container: {
				reset: () => {
				},
				apply: () => {
				},
				drawEvent: new Event()
			}
		};
	}
}
