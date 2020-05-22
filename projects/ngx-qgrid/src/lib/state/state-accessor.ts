import { Injectable } from '@angular/core';
import { GridModel } from '../grid/grid-model';

@Injectable()
export class StateAccessor {
	private setters: Array<(model: GridModel) => void> = [];

	setter<TState>(type: new () => TState): (state: Partial<TState>) => void {
		return value => {
			this.setters.push(model => {
				const accessor = model.resolve(type);
				accessor.state(value);
			});
		};
	}

	write(model: GridModel) {
		for (const setter of this.setters) {
			setter(model);
		}

		this.setters = [];
	}
}
