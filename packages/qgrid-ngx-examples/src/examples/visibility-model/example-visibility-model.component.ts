import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { Grid, GridModel } from 'ng2-qgrid';
import { Observable } from 'rxjs';
import { Atom, DataService } from '../data.service';

@Component({
  selector: 'example-visibility-model',
  templateUrl: 'example-visibility-model.component.html',
  styleUrls: ['example-visibility-model.component.scss'],
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleVisibilityStateComponent implements AfterViewInit {
  static id = 'visibility-model';

  rows: Observable<Atom[]>;
  gridModel: GridModel;

  constructor(dataService: DataService,
		private qgrid: Grid,
  ) {
    this.rows = dataService.getAtoms();
    this.gridModel = qgrid.model();
  }

  ngAfterViewInit() {
    this.gridModel.visibility({
      toolbar: {
        bottom: false,
        left: false,
        right: false,
        top: false,
      },
    });
  }
}
