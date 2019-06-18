import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'q-grid-pane-trigger',
	templateUrl: './pane-trigger.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaneTriggerComponent {
	context: any = {
		$implicit: this
	};
}
