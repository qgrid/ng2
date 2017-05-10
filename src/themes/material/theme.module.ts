import {NgModule, Injectable} from '@angular/core';

@Injectable()
export class Theme {
  name = 'material';

  constructor() {
  }
}


@NgModule({
  declarations: [],
  exports: [],
  imports: [],
  providers: [
    Theme
  ]
})
export class ThemeModule {
  constructor() {
  }
}
