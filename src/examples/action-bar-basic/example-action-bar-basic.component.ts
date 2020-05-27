import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DataService, Atom } from '../data.service';
import { Observable, of, Subject } from 'rxjs';
import { Command } from 'ng2-qgrid';

@Component({
	selector: 'example-action-bar-basic',
	templateUrl: 'example-action-bar-basic.component.html',
	styleUrls: ['example-action-bar-basic.component.scss'],
	providers: [DataService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleActionBarBasicComponent {
	static id = 'action-bar-basic';

	private atoms: Atom[] = [];

	canLoad = false;
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
