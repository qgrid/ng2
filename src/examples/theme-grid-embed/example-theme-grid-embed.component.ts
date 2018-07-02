import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-theme-grid-embed',
	templateUrl: 'example-theme-grid-embed.component.html',
	styleUrls: ['example-theme-grid-embed.component.scss'],
	providers: [DataService]
})
export class ExampleThemeGridEmbedComponent {
	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}