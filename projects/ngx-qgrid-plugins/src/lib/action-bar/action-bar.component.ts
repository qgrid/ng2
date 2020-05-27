import { OnDestroy, OnInit, Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Action } from '@qgrid/core/action/action';
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
		const { model, observe } = this.plugin;

		observe(model.actionChanged)
			.subscribe(e => {
				if (e.hasChanges('items')) {
					this.cd.markForCheck();
					this.cd.detectChanges();
				}
			});
	}

	get actions(): Action[] {
		return this.plugin.model.action().items;
	}
}
