import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Atom, DataService } from '../data.service';

@Component({
	selector: 'example-visibility-basic',
	templateUrl: 'example-visibility-basic.component.html',
	styleUrls: ['example-visibility-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleVisibilityBasicComponent {
	static id = 'visibility-basic';

	rows: Observable<Atom[]>;

	constructor(dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
