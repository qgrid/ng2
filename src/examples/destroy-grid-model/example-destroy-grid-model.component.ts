import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../data.service';
import { GridModel, Grid } from 'ng2-qgrid';
import { BehaviorSubject } from 'rxjs';

const EXAMPLE_TAGS = [
	'destroy-grid-model',
	'Table content can be destroyed/restored using UI button'
];

@Component({
	selector: 'example-destroy-grid-model',
	templateUrl: 'example-destroy-grid-model.component.html',
	styleUrls: ['example-destroy-grid-model.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDestroyGridModelComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	gridModel: GridModel;
	isVisible = false;

	handlerCount$ = new BehaviorSubject<number>(0);

	constructor(
		private cd: ChangeDetectorRef,
		dataService: DataService,
		qgrid: Grid,
	) {
		this.gridModel = qgrid.model();

		dataService
			.getPeople()
			.subscribe(rows => this.gridModel.data({ rows }));
	}

	getHandlerCount(): number {
		const model = this.gridModel as { [key: string]: any };
		let count = 0;
		for (const key in model) {
			if (model.hasOwnProperty(key) && key.endsWith('Changed')) {
				const event = model[key];

				// `handlers` is private really
				const { length } = event.handlers;
				if (length) {
					count += length;
					if (!this.isVisible) {
						console.warn(`${key} has some unsubscribed subscriptions`);
						console.warn(event.handlers);
					}
				}
			}
		}
		return count;
	}

	toggleVisibility() {
		this.isVisible = !this.isVisible;

		setTimeout(() => {
			this.handlerCount$.next(this.getHandlerCount());
		}, 500);
	}
}
