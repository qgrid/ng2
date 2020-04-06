import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GridPlugin } from 'ngx-qgrid';

@Component({
	selector: 'q-grid-actions',
	template: '',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionListComponent {
	constructor(private plugin: GridPlugin) { }
}
