import {
  ChangeDetectorRef,
  Directive,
  Input,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { ObservableLike, UnsubscribableLike } from '@qgrid/core';

@Directive({
  selector: '[q-grid-dirty-host]',
})
export class DirtyHostDirective implements OnDestroy {
  private subscription: UnsubscribableLike | null = null;

  whoNeedsIt = 0;

  @Input('q-grid-dirty-host') set trigger(value: ObservableLike<any>) {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }

    if (value) {
      this.subscription = value.subscribe(() => {
        if (this.whoNeedsIt > 0) {
          this.zone.run(() => {
            this.cd.detectChanges();
          });
        }
      });
    }
  }

  constructor(
    private zone: NgZone,
    private cd: ChangeDetectorRef,
  ) {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
