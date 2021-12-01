import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Command } from 'ng2-qgrid';
import { Subject } from 'rxjs';
import { Atom, DataService } from '../data.service';

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
			return true;
		},
		canExecute: () => this.canLoad,
		shortcut: 'alt+l'
	});

	clearCommand = new Command({
		execute: () => {
			this.canLoad = true;
			this.rows$.next([]);

			this.loadCommand.canExecuteCheck.next();
			return true;
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
