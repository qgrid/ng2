import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppState} from './app.service';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./app.component.scss')],
  template: `
    <header>
    </header>
    <main fxFlex>
      <router-outlet></router-outlet>
    </main>
    <footer>
    </footer>
  `
})
export class AppComponent implements OnInit {
  constructor(public appState: AppState) {
  }

  public ngOnInit() {
  }
}
