import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-theme-grid-embed',
	templateUrl: 'example-theme-grid-embed.component.html',
	styleUrls: ['example-theme-grid-embed.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleThemeGridEmbedComponent {
	static id = 'theme-grid-embed';

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
