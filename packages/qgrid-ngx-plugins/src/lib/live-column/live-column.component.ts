import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgZone,
  OnInit,
} from '@angular/core';
import { ColumnView } from '@qgrid/core';
import { Fastdom, GRID_PREFIX } from '@qgrid/core';
import { GridPlugin } from '@qgrid/ngx';

@Component({
  selector: 'q-grid-live-columns',
  template: '',
  providers: [GridPlugin],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveColumnComponent implements OnInit {
  @Input('duration') duration = 500;

  constructor(private plugin: GridPlugin, private zone: NgZone) { }

  ngOnInit() {
    let startPos: number;
    let endPos: number;
    const { model } = this.plugin;
    let currentColumns: ColumnView[];

    model.animation({
      apply: model.animation().apply.concat((memo, context, complete) => {
        const previousColumns = currentColumns;
        currentColumns = memo.columns ? memo.columns[0] : currentColumns;

        if (!previousColumns || !memo.columns) {
          complete(0);
          return;
        }

        const { columnId } = model.data();
        const animations: Promise<void>[] = [];

        startPos = currentColumns.length;
        endPos = 0;

        for (let columnIndex = 0, length = previousColumns.length; columnIndex < length; columnIndex++) {
          const newColumnIndex = currentColumns.findIndex((column, i) =>
            columnId(i, column.model) === columnId(columnIndex, previousColumns[columnIndex].model));

          if (newColumnIndex !== columnIndex) {
            startPos = Math.min(Math.min(columnIndex, newColumnIndex), startPos);
            endPos = Math.max(Math.max(columnIndex, newColumnIndex), endPos);
          }
        }

        for (let columnIndex = 0, length = previousColumns.length; columnIndex < length; columnIndex++) {
          const newColumnIndex = currentColumns.findIndex((column, i) =>
            columnId(i, column.model) === columnId(columnIndex, previousColumns[columnIndex].model));

          if (newColumnIndex !== columnIndex) {
            animations.push(this.moveColumn(columnIndex, newColumnIndex, startPos, endPos));
          }
        }

        this.zone.runOutsideAngular(() => {
          Promise.all(animations)
            .then(complete);
        });
      }),
    });
  }

  private moveColumn(from: number, to: number, startPos: number, endPos: number) {
    const { table } = this.plugin;

    return new Promise<void>((animationEnd, animationError) => {
      const oldColumn = table.body.column(from);
      const newColumn = table.body.column(to);
      const startColumn = table.body.column(startPos);
      const endColumn = table.body.column(endPos);

      if (!oldColumn.model() || !newColumn.model()) {
        const errorIndex = oldColumn.model() ? to : from;
        animationError(`Can't find model for column ${errorIndex}`);
        return;
      }

      Fastdom.measure(() => {
        const newRect = newColumn.cells()[0].rect();
        const oldRect = oldColumn.cells()[0].rect();
        const startRect = startColumn.cells()[0].rect();
        const endRect = endColumn.cells()[0].rect();
        let offset = 0;

        if (from < to) {
          offset = (Math.abs(from - to) > 1) ? newRect.left - oldRect.right + endRect.width : endRect.width;
        } else {
          offset = (Math.abs(from - to) > 1) ? newRect.left - oldRect.left : -1 * startRect.width;
        }

        Fastdom.mutate(() => {
          const animatedCells: Promise<void>[] = [];
          oldColumn.addClass(`${GRID_PREFIX}-live-column`);
          oldColumn.cells().forEach(cell => animatedCells.push(
            new Promise<void>(columnAnimationEnd => {
              const animation = cell.model().element.animate(
                [{ transform: 'translateX(0px)' }, { transform: `translateX(${offset}px)` }],
                { duration: this.duration },
              );

              animation.onfinish = () => Fastdom.mutate(() => {
                oldColumn.removeClass(`${GRID_PREFIX}-live-column`);
                oldColumn.removeClass(`${GRID_PREFIX}-drag`);
                columnAnimationEnd();
              });
            })));

          Promise.all(animatedCells).finally(() => animationEnd());
        });
      });
    });
  }
}
