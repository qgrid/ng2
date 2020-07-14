import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation, OnDestroy } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';

const EXAMPLE_TAGS = [
	'live-rows',
	'Grid actions are animated (e.g. row sorting)'
];

@Component({
	selector: 'example-live-rows-basic',
	templateUrl: 'example-live-rows-basic.component.html',
	styleUrls: ['example-live-rows-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class ExampleLiveRowsBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	rows: Observable<Atom[]>;

	constructor(private dataService: DataService) {
		this.rows = dataService.getAtoms();
	}
}
