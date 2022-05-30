import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import {
  Disposable,
  IVscrollContext,
  Log,
  ObservableLike,
  SubjectLike,
} from '@qgrid/core';

@Pipe({
  name: 'qGridVscroll$',
  pure: true,
})
export class VscrollPipe implements OnDestroy, PipeTransform {
  private disposable = new Disposable();

  constructor(private cd: ChangeDetectorRef) {
  }

  transform(data: any[], context: IVscrollContext): ObservableLike<any> {
    this.disposable.finalize();

    if (!context) {
      Log.warn('VscrollPipe', 'Context is not defined');
      return new SubjectLike();
    }

    data = data || [];
    const { container, settings } = context;
    const items$ = new SubjectLike<any>();

    container.update(data.length);

    let cursor = container.position;
    this.disposable.add(
      container.draw$.subscribe(({ position }) => {
        const { length } = data;
        const { threshold } = settings;

        container.update(length);

        // We need to have a less number of virtual items on
        // the bottom, as deferred loading is happen there should
        // be a threshold place to draw several items below so we use cursor for the last
        const first = position;
        if (container.force || first !== cursor) {
          const last = Math.min(first + threshold, length);
          const wnd = new Array(last - first);

          cursor = first;
          container.force = false;

          for (let i = first, j = 0; i < last; i++, j++) {
            wnd[j] = data[i];
          }

          // TODO: remove that workaround
          // async pipe doesn't trigger change detection,
          // so we put subscription here to invoke detect changes
          // after async pipe marks for check
          const sub = items$.subscribe(() => {
            this.cd.detectChanges();
          });

          try {
            items$.next(wnd);
          } finally {
            sub.unsubscribe();
          }
        }
      }),
    );

    return items$;
  }

  ngOnDestroy() {
    this.disposable.finalize();
  }
}
