import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable } from 'rxjs';
import { Action, Command } from 'ng2-qgrid';

@Component({
	selector: 'example-column-file-basic',
	templateUrl: 'example-column-file-basic.component.html',
	styleUrls: ['example-column-file-basic.component.scss'],
	providers: [DataService]
})
export class ExampleColumnFileBasicComponent {
	rows = [
		{
			'valid': 'https://rawgit.com/qgrid/ng2/master/CHANGELOG.md',
			'invalid': 'Lorem ipsum dolor',
			'withLabel': 'https://rawgit.com/qgrid/ng2/master/CHANGELOG.md',
			'empty': '',
			'customTemplate': 'https://rawgit.com/qgrid/ng2/master/CHANGELOG.md'
		}
	];

	constructor(dataService: DataService) {
	}
}