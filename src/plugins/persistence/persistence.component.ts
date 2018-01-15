import { Component, Optional, Input, Output, EventEmitter } from '@angular/core';
import { RootService } from 'ng2-qgrid/infrastructure/component';
import { PluginComponent } from '../plugin.component';
import { PersistenceView } from 'ng2-qgrid/plugin/persistence/persistence.view';
import { Command } from 'ng2-qgrid/core/command/command';
import { Action } from 'ng2-qgrid/core/action/action';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PersistenceDialogComponent } from 'ng2-qgrid/plugins/persistence/persistence-dialog.component';
import { Composite } from 'ng2-qgrid/core/infrastructure/composite';
import { TemplateService } from 'ng2-qgrid/template';

const PersistenceName = 'qGridPersistence';

@Component({
	selector: 'q-grid-persistence',
	template: ''
})
export class PersistenceComponent extends PluginComponent {

	private persistence: PersistenceView;

	constructor( @Optional() root: RootService, private dialog: MatDialog, private templateService: TemplateService) {
		super(root);

		this.models = ['persistence'];
	}

	ngOnInit() {
		this.persistence = new PersistenceView(this.model);

		const actions = [
			new Action(
				new Command({
					source: 'persistence',
					execute: () => {
						const templateLink = this.templateService.find('plugin-persistence.tpl.html');
						const dialogRef = this.dialog.open(templateLink.template, {
							data: this.persistence
						});
					}
				}),
				'Save/Load',
				'history'
			)
		];

		this.model.action({
			items: Composite.list([actions, this.model.action().items])
		});
	}

	ngOnDestroy() {
		this.persistence.dispose();
	}
}
