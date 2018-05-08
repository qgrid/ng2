import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Model } from 'ng2-qgrid/core/infrastructure/model';

@Component({
	selector: 'q-grid-theme',
	templateUrl: './theme.component.gen.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeComponent {
	constructor() { }
}
