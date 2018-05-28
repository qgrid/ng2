import { Component, OnInit } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable, of } from 'rxjs';
import { Command } from 'ng2-qgrid';

@Component({
	selector: 'example-action-bar-basic',
	templateUrl: 'example-action-bar-basic.component.html',
	styleUrls: ['example-action-bar-basic.component.scss'],
	providers: [DataService]
})
export class ExampleActionBarBasicComponent {
	canLoad = true;
	rows: Observable<Atom[]>;

	loadCommand = new Command({
		execute: () => {
			this.rows = this.dataService.getAtoms();
			this.canLoad = false;
		},
		canExecute: () => this.canLoad,
		shortcut: 'ctrl+l'
	});

	clearCommand = new Command({
		execute: () => {
			this.rows = of([])
			this.canLoad = true;
		},
		canExecute: () => !this.canLoad,
		shortcut: 'ctrl+d'
	});

	constructor(private dataService: DataService) {
	}
}