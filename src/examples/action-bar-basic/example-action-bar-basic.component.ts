import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable, Subject } from 'rxjs';
import { Command } from 'ng2-qgrid';

const EXAMPLE_TAGS = [
	'action-bar-basic',
	'Data can be cleared and loaded using UI buttons and hotkeys (ALT+D, ALT+L)'
];

@Component({
	selector: 'example-action-bar-basic',
	templateUrl: 'example-action-bar-basic.component.html',
	styleUrls: ['example-action-bar-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleActionBarBasicComponent {
	static tags = EXAMPLE_TAGS;
	title = EXAMPLE_TAGS[1];

	canLoad = false;
	atoms: Atom[] = [];
	rows$ = new Subject<Atom[]>();

	loadCommand = new Command({
		execute: () => {
			this.canLoad = false;
			this.rows$.next(this.atoms);

			this.clearCommand.canExecuteCheck.next();
		},
		canExecute: () => this.canLoad,
		shortcut: 'alt+l'
	});

	clearCommand = new Command({
		execute: () => {
			this.canLoad = true;
			this.rows$.next([]);

			this.loadCommand.canExecuteCheck.next();
		},
		canExecute: () => !this.canLoad,
		shortcut: 'alt+d'
	});

	constructor(
		dataService: DataService,
		private cd: ChangeDetectorRef
	) {
		dataService.getAtoms()
			.subscribe(atoms => {
				this.atoms = atoms;
				this.loadCommand.execute();
			});
	}
}
