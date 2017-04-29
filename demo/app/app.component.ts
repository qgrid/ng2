import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppState} from './app.service';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <header>
    </header>
    <main>
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
