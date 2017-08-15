import {OnInit, OnDestroy} from '@angular/core';
import {DisposableView} from '@grid/core/view/disposable.view';

export abstract class NgComponent extends DisposableView implements OnInit, OnDestroy {
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.dispose();
  }
}
