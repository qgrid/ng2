import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Model } from 'ng2-qgrid/core/infrastructure/model';

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
