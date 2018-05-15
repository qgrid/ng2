import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  rows = [{
    foo: 1,
    bar: 1
  }, {
    foo: 2,
    bar: 2
  }]
}
