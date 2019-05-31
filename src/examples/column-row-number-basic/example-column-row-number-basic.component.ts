import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
	selector: 'example-column-row-number-basic',
	templateUrl: 'example-column-row-number-basic.component.html',
	styleUrls: ['example-column-row-number-basic.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleColumnRowNumberBasicComponent {

	static id = 'column-row-number-basic';

	rows = [
		{},
		{},
		{},
		{},
	];

}
