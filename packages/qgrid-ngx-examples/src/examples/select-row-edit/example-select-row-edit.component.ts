import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService } from '../data.service';

const EXAMPLE_TAGS = ['select-row-edit', 'Rows can be selected using checkboxes. Cell data can be edited'];

@Component({
  selector: 'example-select-row-edit',
  templateUrl: 'example-select-row-edit.component.html',
  styleUrls: ['example-select-row-edit.component.scss'],
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleSelectRowEditComponent {
  static tags = EXAMPLE_TAGS;
  title = EXAMPLE_TAGS[1];

  rows$ = this.dataService.getPeople();

  constructor(private dataService: DataService) {
  }
}
