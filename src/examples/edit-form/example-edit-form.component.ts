import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';
import { Command, GridComponent, PaneComponent } from 'ng2-qgrid';

@Component({
    selector: 'example-edit-form',
    templateUrl: './example-edit-form.component.html',
    styleUrls: ['./example-edit-form.component.scss'],
    providers: [DataService],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ExampleEditFormComponent {
    static id = 'edit-form';

    rows: Observable<Human[]>;
    @ViewChild(GridComponent) myGrid: GridComponent;
    @ViewChild(PaneComponent) pane: PaneComponent;

    openPane = new Command({
      execute: () => this.pane.open('right'),
      canExecute: () => !!this.myGrid.model.navigation().cell,
    });  

    constructor(dataService: DataService) {
      this.rows = dataService.getPeople();
    }
}
