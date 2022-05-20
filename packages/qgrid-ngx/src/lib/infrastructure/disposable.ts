import { Injectable, OnDestroy } from '@angular/core';
import { Disposable as DisposableCore, DisposableResource } from '@qgrid/core';

@Injectable()
export class Disposable implements OnDestroy {
  private disposable = new DisposableCore();

  add(resource: DisposableResource): void {
    this.disposable.add(resource);
  }

  remove(resource: DisposableResource): boolean {
    return this.disposable.remove(resource);
  }

  finalize(): void {
    this.disposable.finalize();
  }

  ngOnDestroy() {
    this.finalize();
  }
}
