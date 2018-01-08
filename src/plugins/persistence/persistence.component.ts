import { Component, Optional, Input, Output, EventEmitter } from '@angular/core';
import { RootService } from 'ng2-qgrid/infrastructure/component';
import { PluginComponent } from '../plugin.component';
import { PersistenceView } from 'ng2-qgrid/plugin/persistence/persistence.view';
import { Command } from 'ng2-qgrid/core/command/command';
import { Action } from 'ng2-qgrid/core/action/action';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

const PersistenceName = 'qGridPersistence';

@Component({
	selector: 'q-grid-persistence',
	templateUrl: './persistence.component.html'
})
export class PersistenceComponent extends PluginComponent {

	private persistence: PersistenceView;

	constructor(@Optional() root: RootService) {
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
                        let dialogRef = this.dialog.open(PersistenceDialog, {
                            width: '250px',
                            data: { persistence: this.persistence }
                          });
                      
                        // dialogRef.afterClosed().subscribe(result => {
                        //     console.log('The dialog was closed');
                        //     this.animal = result;
                        // });

                        // this.context = { $implicit: this.persistence };
                    }
                }),
                'Load/Save',
                'history'
            )
        ];
	}

	ngOnDestroy() {
		this.persistence.dispose();
	}
}
