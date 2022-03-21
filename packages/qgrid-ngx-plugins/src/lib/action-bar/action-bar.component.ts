import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Action } from '@qgrid/core';
import { GridPlugin } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-action-bar',
	templateUrl: './action-bar.component.html',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionBarComponent implements OnInit {

	context: { $implicit: ActionBarComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: GridPlugin,
		private cd: ChangeDetectorRef,
	) {
	}

	ngOnInit() {
		const { model, observeReply } = this.plugin;

		observeReply(model.actionChanged)
			.subscribe(e => {
				const initialItems = e.state.items;
				const isSorted = this.isSorted(initialItems);

				if(isSorted) {
					this.cd.markForCheck();
					this.cd.detectChanges();
				} else {
					model.action({
						items: initialItems.sort((a: Action, b: Action) => {
							return a.command.priority - b.command.priority;
						})
					});
				}

				if (e.hasChanges('items')) {
					this.cd.markForCheck();
					this.cd.detectChanges();
				}
			});
	}

	get actions(): Action[] {
		const { model } = this.plugin;
		return model.action().items;
	}

	isSorted(array: Action[]): boolean {
		for (let i = 0; i < array.length - 1; i++) {
			if (array[i].command.priority > array[i + 1].command.priority) {
					return false;
			}
		}

		return true;
	}
}
