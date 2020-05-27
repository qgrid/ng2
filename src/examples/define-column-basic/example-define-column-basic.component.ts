import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'example-define-column-basic',
	templateUrl: 'example-define-column-basic.component.html',
	styleUrls: ['example-define-column-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleDefineColumnBasicComponent {
	static id = 'define-column-basic';

	rows$: Observable<Atom[]> = this.dataService.getAtoms();

	constructor(private dataService: DataService) {
	}
}
