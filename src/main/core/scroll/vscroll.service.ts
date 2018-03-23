import { Event } from 'ng2-qgrid/core/infrastructure/event';

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
