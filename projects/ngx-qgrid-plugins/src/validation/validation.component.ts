import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { GridPlugin } from 'ngx-qgrid';

@Component({
	selector: 'q-grid-validation',
	template: '',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationComponent {
	@Input() type: string;
}
