import { final } from '../infrastructure/final';
import {
	checkButtonCode, getButtonCode, LEFT_BUTTON,
	NO_BUTTON, stringify
} from '../mouse/mouse.code';
import { PathService } from '../path/path.service';
import { PipeUnit } from '../pipe/pipe.unit';
import { eventPath } from '../services/dom';
import { Fastdom } from '../services/fastdom';
import { jobLine } from '../services/job.line';

export class ViewHost {
  constructor(plugin) {
    this.plugin = plugin;

    this.watch(plugin.service);
    this.final = final();

    // todo: make the logic based on mouse state
    this.startCell = null;
  }

  invalidate() {
    this.final(() => {
      const { view } = this.plugin;
      const { style } = view;

      if (style.needInvalidate()) {
        const rowMonitor = style.monitor.row;
        const cellMonitor = style.monitor.cell;

        Fastdom.mutate(() => {
          // Apply mutate inside another mutate to ensure that style.invalidate is triggered last.
          Fastdom.mutate(() => {
            const domCell = cellMonitor.enter();
            const domRow = rowMonitor.enter();
            try {
              style.invalidate(domCell, domRow);
            }
            finally {
              rowMonitor.exit();
              cellMonitor.exit();
            }
          });
        });
      }
    });
  }

  triggerLine(service, timeout) {
    const { model } = this.plugin;
    const { reduce } = model.pipe();

    let session = [];
    const job = jobLine(timeout);
    return (source, changes, units) => {
      model.scene({ status: 'start' }, {
        source
      });

      session.push(...units);
      job(() => {
        const units = reduce(session, model);
        session = [];

        units.forEach(pipe =>
          service.invalidate({
            source,
            changes,
            pipe,
            why: pipe.why || 'refresh'
          })
        );
      });
    };
  }

  watch(service) {
    const { model, observeReply } = this.plugin;;
    const { triggers } = model.pipe();
    const { pipe } = model.data();

    const triggerJob = this.triggerLine(service, 10);
    if (pipe !== PipeUnit.default) {
      triggerJob('grid', {}, [pipe]);
    }

    Object.keys(triggers)
      .forEach(name =>
        observeReply(model[name + 'Changed'])
          .subscribe(e => {
            if (e.tag.behavior === 'core') {
              return;
            }

            const units = [];
            const trigger = triggers[name];
            for (const key in e.changes) {
              const unit = trigger[key];
              if (unit) {
                units.push(unit);
              }
            }

            if (units.length > 0) {
              triggerJob(e.tag.source || name, e.changes, units);
            }
          }));
  }

  mouseDown(e) {
    const { model, view } = this.plugin;
    const { edit } = model;

    const td = this.findCell(e);

    model.mouse({
      code: stringify(getButtonCode(e)),
      status: 'down',
      target: td
    }, {
      source: 'mouse.down'
    });

    if (checkButtonCode(e, LEFT_BUTTON)) {
      const { area, mode } = this.selection;

      if (td) {
        const fromNotEditMode = edit().status === 'view'

        this.navigate(td);
        if (area === 'body') {
          this.select(td);
        }

        if (fromNotEditMode && view.edit.cell.enter.canExecute(td)) {
          view.edit.cell.enter.execute(td);
        }

        if (mode === 'range' && td.column.type !== 'select') {
          this.startCell = td;
          view.selection.selectRange(td, null, 'body');
        }
      }
    }
  }

  mouseUp(e) {
    const { model } = this.plugin;
    const { edit } = model;

    const td = this.findCell(e);

    this.startCell = null;

    model.mouse({
      code: stringify(getButtonCode(e)),
      status: 'up',
      target: td,
    }, {
      source: 'mouse.up'
    });

    if (checkButtonCode(e, LEFT_BUTTON)) {
      if (edit().status === 'startBatch') {
        edit({ status: 'endBatch' }, { source: 'body.ctrl' });
      }
    }

    model.mouse({
      code: stringify(NO_BUTTON),
      status: 'release',
      target: null,
      timestamp: Date.now(),
    }, {
      source: 'mouse.up'
    });
  }

  mouseMove(e) {
    const { model, view } = this.plugin;
    const { highlight } = view;
    const { rows, cell } = model.highlight();

    const td = this.findCell(e);
    if (td) {

      if (cell) {
        highlight.cell.execute(cell, false);
      }

      const newCell = {
        rowIndex: td.rowIndex,
        columnIndex: td.columnIndex
      };

      model.mouse({
        status: 'move',
        target: cell || newCell
      }, {
        source: 'mouse.move'
      });

      if (highlight.cell.canExecute(newCell)) {
        highlight.cell.execute(newCell, true)
      }

      const tr = this.findRow(e);
      if (tr) {
        const { index } = tr;

        if (highlight.oneRow.canExecute(index)) {
          highlight.oneRow.execute(index, true);
        }
      }

      if (checkButtonCode(e, LEFT_BUTTON)) {
        if (this.selection.mode === 'range') {
          const startCell = this.startCell;
          const endCell = td;

          if (startCell && endCell) {
            this.navigate(endCell);
            view.selection.selectRange(startCell, endCell, 'body');
          }
        }
      }

    } else {
      model.mouse({
        status: 'move',
        target: null,
      }, {
        source: 'mouse.move'
      });
    }
  }

  mouseEnter(e) {
    const { model } = this.plugin;
    model.mouse({
      status: 'enter',
      target: null,
      code: null
    }, {
      source: 'mouse.enter'
    });
  }

  mouseLeave() {
    const { model } = this.plugin;

    model.mouse({
      status: 'leave',
      target: null,
      code: null
    }, {
      source: 'mouse.leave'
    });

    this.clearHighlight();
  }

  select(cell) {
    const { area, mode, unit } = this.selection;
    if (cell.column.type !== 'select' && (area !== 'body' || mode === 'range')) {
      return;
    }

    const { model, view } = this.plugin;
    const editMode = model.edit().mode;
    switch (unit) {
      case 'row': {
        if (cell.column.type === 'select' && cell.column.editorOptions.trigger === 'focus') {
          const focusState = model.focus();
          if (focusState.rowIndex !== cell.rowIndex || focusState.columnIndex !== cell.columnIndex) {
            if (view.selection.toggleRow.canExecute(cell.row)) {
              view.selection.toggleRow.execute(cell.row, 'body');
            }
          }
        } else if (!editMode && cell.column.category !== 'control') {
          if (view.selection.toggleRow.canExecute(cell.row)) {
            view.selection.toggleRow.execute(cell.row, 'body');
          }
        }

        break;
      }

      case 'column': {
        if (!editMode) {
          view.selection.toggleColumn.execute(cell.column, 'body');
        }

        break;
      }

      case 'mix': {
        if (cell.column.type === 'row-indicator') {
          view.selection.toggleCell.execute(cell, 'body');
        }

        break;
      }
    }
  }

  navigate(cell) {
    const { view } = this.plugin;
    const { focus } = view.nav;

    if (focus.canExecute(cell)) {
      focus.execute(cell);
    }
  }

  findCell(e) {
    const { table } = this.plugin;
    const pathFinder = new PathService(table.box.bag.body);
    const path = eventPath(e);

    let td = pathFinder.cell(path);
    if (!td) {
      const firstElement = path[0];
      const isEditMarker =
        firstElement
        && firstElement.classList.contains('q-grid-edit-marker');

      if (isEditMarker) {
        const { model } = this.plugin;
        const { rowIndex, columnIndex } = model.focus();
        td = table.body.cell(rowIndex, columnIndex).model();
      }
    }

    return td;
  }

  findRow(e) {
    const { table } = this.plugin;
    const pathFinder = new PathService(table.box.bag.body);
    const path = eventPath(e);
    return pathFinder.row(path);
  }

  clearHighlight() {
    const { view } = this.plugin;
    const { highlight } = view;
    if (highlight.clear.canExecute()) {
      highlight.clear.execute();
    }
  }

  get selection() {
    const { model } = this.plugin;
    return model.selection();
  }
}
