import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { GridPlugin } from '@qgrid/ngx';

@Component({
	selector: 'q-grid-validation',
	template: '',
	providers: [GridPlugin],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationComponent {
	@Input() type: string;
}
