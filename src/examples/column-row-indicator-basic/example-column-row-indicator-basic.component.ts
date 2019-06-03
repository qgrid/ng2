import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'example-column-row-indicator-basic',
	templateUrl: 'example-column-row-indicator-basic.component.html',
	styleUrls: ['example-column-row-indicator-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleColumnRowIndicatorBasicComponent {
	static id = 'column-row-indicator-basic';

	rows = [
		{},
		{},
		{},
		{}
	];
}
