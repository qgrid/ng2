import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { GridModel } from 'ng2-qgrid';

@Component({
	selector: 'example-action-bar-template',
	templateUrl: 'example-action-bar-template.component.html',
	styleUrls: ['example-action-bar-template.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleActionBarTemplateComponent {
	rows: Observable<Atom[]>;

	constructor(private dataService: DataService) {
		this.rows = dataService.getAtoms();
	}

	sortBySymbol(gridModel: GridModel, dir: string) {
		gridModel.sort({ by: [`${dir}symbol`] });
	}
}
