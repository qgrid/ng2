import {
  Component,
  OnInit
} from '@angular/core';

import {AppState} from '../app.service';

@Component({
  selector: 'home',
  providers: [],
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  constructor(public appState: AppState) {
  }

  public ngOnInit() {
  }
}
