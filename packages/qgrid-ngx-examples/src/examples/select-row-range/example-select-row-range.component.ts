import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Grid } from 'ng2-qgrid';
import { DataService } from '../data.service';

const EXAMPLE_TAGS = ['select-row-range', 'Select Row Range by Mouse Drag'];

@Component({
  selector: 'example-select-row-basic',
  templateUrl: 'example-select-row-range.component.html',
  styleUrls: ['example-select-row-range.component.scss'],
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleSelectRowRangeComponent {
  static tags = EXAMPLE_TAGS;
  title = EXAMPLE_TAGS[1];

  gridModel = this.qgrid.model();
  rows$ = this.dataService.getPeople();

  constructor(
		private dataService: DataService,
		private qgrid: Grid,
  ) {
  }
}
