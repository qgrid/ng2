import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'q-grid-theme',
	styleUrls: ['./index.scss'],
	templateUrl: './theme.component.gen.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class ThemeComponent {
	constructor() { }
}
