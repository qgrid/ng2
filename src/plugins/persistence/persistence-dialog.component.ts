import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PluginComponent } from 'ng2-qgrid/plugins';
import { RootService } from 'ng2-qgrid/infrastructure/component';

@Component({
	selector: 'q-grid-persistence-dialog',
	templateUrl: './persistence-dialog.component.html'
})
export class PersistenceDialogComponent {
	context: any;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
		this.context = { $implicit: this.data.persistence };
	}
}
