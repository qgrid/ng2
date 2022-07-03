import {
  ChangeDetectorRef,
  Directive,
  Host,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  SkipSelf,
} from '@angular/core';
import { ObservableLike, UnsubscribableLike } from '@qgrid/core';
import { DirtyHostDirective } from './dirty-host.directive';

@Directive({
  selector: '[q-grid-dirty]',
})
export class DirtyDirective implements OnDestroy {
  private subscription: UnsubscribableLike | null = null;

  @Input('q-grid-dirty') set trigger(value: ObservableLike<any>) {
    // todo: trigger cd only for particular values
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }

    if (value) {
      this.subscription = value.subscribe(() => {
        if (this.host) {
          this.cd.markForCheck();
        } else {
          this.zone.run(() => {
            this.cd.markForCheck();
            this.cd.detectChanges();
          });
        }
      });
    }
  }

  constructor(
    private zone: NgZone,
    private cd: ChangeDetectorRef,
    @Optional() @Host() @SkipSelf() private host: DirtyHostDirective,
  ) {
    if (this.host) {
      this.host.whoNeedsIt++;
    }
  }

  ngOnDestroy() {
    if (this.host) {
      this.host.whoNeedsIt--;
    }

    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
