import {Component, ElementRef, Optional, Input} from '@angular/core';
import {Component as NgComponent} from '../component';
import {ThemeService} from '../../services/theme.service';
import {ThemeProvider} from '../../services/theme.provider';
import {GridComponent} from '../grid/grid.component';
import {GRID_PREFIX} from 'core/definition';
import guard from 'core/infrastructure/guard';

@Component({
  selector: 'q-grid-core-box',
  template: ''
})
export class BoxCoreComponent extends NgComponent {
  @Input('model') boxModel: any = null;

  private element: HTMLElement = null;
  private theme: ThemeService = null;

  constructor(@Optional() private root: GridComponent, element: ElementRef, themeProvider: ThemeProvider) {
    super();

    this.element = element.nativeElement;
    this.theme = themeProvider.service();
  }

  ngOnInit() {
    this.initTheme();

    const model = this.model;
    model.dragChanged.watch(e => {
      if (e.hasChanges('isActive')) {
        if (model.drag().isActive) {
          this.element.classList.add(`${GRID_PREFIX}-drag`);
        }
        else {
          this.element.classList.remove(`${GRID_PREFIX}-drag`);
        }
      }
    });
  }

  initTheme() {
    const element = this.element;

    element.classList.add(GRID_PREFIX);
    this.theme.changed.watch(e => {
      if (e) {
        element.classList.remove(`${GRID_PREFIX}-theme-${e.oldValue}`);
      }

      element.classList.add(`${GRID_PREFIX}-theme-${this.theme.name}`);
    });
  }

  get model() {
    const model = this.boxModel || this.root.model;
    guard.notNull('model', model);

    return model;
  }
}
