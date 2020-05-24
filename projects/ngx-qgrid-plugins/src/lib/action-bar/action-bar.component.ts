import { OnDestroy, OnInit, Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Action } from '@qgrid/core/action/action';
import { GridPlugin } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-action-bar',
	templateUrl: './action-bar.component.html',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionBarComponent {

	context: { $implicit: ActionBarComponent } = {
		$implicit: this
	};

	constructor(
		private plugin: GridPlugin,
	) {
	}

	get actions(): Action[] {
		return this.plugin.model.action().items;
	}
}
