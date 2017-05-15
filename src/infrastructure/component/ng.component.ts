import {OnInit, OnDestroy} from '@angular/core';

export abstract class NgComponent implements OnInit, OnDestroy {
  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
