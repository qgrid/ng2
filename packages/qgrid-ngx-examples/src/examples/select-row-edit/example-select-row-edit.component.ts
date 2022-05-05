import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DataService, Human } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'example-select-row-edit',
  templateUrl: 'example-select-row-edit.component.html',
  styleUrls: ['example-select-row-edit.component.scss'],
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleSelectRowEditComponent {
  static id = 'select-row-edit';

  rows$: Observable<Human[]>;

  constructor(dataService: DataService) {
    this.rows$ = dataService.getPeople();
  }
}
