import {Component, Input, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ViewChildren} from '@angular/core';
import {AppError} from 'ng2-qgrid/core/infrastructure';
import {Command, CommandManager} from 'ng2-qgrid/core/command';
import {Shortcut, ShortcutManager} from 'ng2-qgrid/core/shortcut';

@Component({
	selector: 'edit-chip',
	templateUrl: './edit-chip.tpl.html',
	styleUrls: ['./edit-chip.scss']
})
export class EditChipComponent implements OnInit, OnDestroy {
	@Input() index: number;
	@Input() value: any;
	@ViewChild('addNewInput') addNewInput;

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
	}
}
