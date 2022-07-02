import { Command } from '../command/command';
import { Td } from '../dom/td';
import { Log } from '../infrastructure/log';
import { parseFactory } from '../services/convert';
import { getLabelFactory } from '../services/label';
import { getValueFactory } from '../services/value';
import { Shortcut } from '../shortcut/shortcut';
import { hasOwnProperty } from '../utility/kit';
import * as validationService from '../validation/validation.service';
import { CellEditor } from './edit.cell.editor';

export class EditCellLet {
  get fetch() {
    return this.editor.fetch;
  }

  get value() {
    return this.editor.value;
  }

  set value(value) {
    this.editor.value = value;
  }

  get label() {
    return this.editor.label;
  }

  set label(label) {
    this.editor.label = label;
  }

  get row() {
    return this.cell.row;
  }

  get column() {
    return this.cell.column;
  }

  get cell() {
    return this.editor.td;
  }

  get options() {
    return this.column.options;
  }

  constructor(plugin, shortcut) {
    const { model, observeReply } = plugin;

    this.plugin = plugin;
    this.shortcut = shortcut;

    this.editor = CellEditor.empty;
    this.requestClose = null;

    const commands = this.getCommands();
    shortcut.register(commands);

    this.enter = commands.get('enter');
    this.commit = commands.get('commit');
    this.push = commands.get('push');
    this.cancel = commands.get('cancel');
    this.reset = commands.get('reset');
    this.exit = commands.get('exit');
    this.clear = commands.get('clear');

    observeReply(model.editChanged)
      .subscribe(e => {
        if (e.hasChanges('status') && e.tag.source !== 'edit.cell.view') {
          if (e.changes.status.newValue === 'edit') {
            // this is a trick to go back to the view mode and trigger enter
            // TODO: make it better
            model.edit({
              status: 'view',
            }, {
              source: 'edit.cell.view',
            });

            if (this.enter.canExecute()) {
              this.enter.execute();
            }
          } else if (e.changes.status.newValue === 'view') {
            // this is a trick to go back to the edit mode and trigger cancel
            // TODO: make it better
            model.edit({
              status: 'edit',
            }, {
              source: 'edit.cell.view',
            });

            if (this.requestClose) {
              if (this.requestClose()) {
                return;
              }
            }

            if (this.cancel.canExecute()) {
              this.cancel.execute();
            }
          }
        }
      });

    observeReply(model.navigationChanged)
      .subscribe(e => {
        if (e.hasChanges('cell')) {
          if (this.requestClose) {
            if (this.requestClose()) {
              return;
            }
          }

          const editCell = this.editor.td;
          if (editCell) {
            if (editCell.column.category === 'data') {
              if (this.commit.canExecute(editCell)) {
                this.commit.execute(editCell);
              }
            } else {
              if (this.cancel.canExecute(editCell)) {
                this.cancel.execute(editCell);
              }
            }
          }

          const { cell } = e.state;
          if (cell && (cell.column.editorOptions.trigger === 'focus')) {
            if (this.enter.canExecute(cell)) {
              this.enter.execute(cell);
            }
          }
        }
      });
  }

  mode(cell, status) {
    const { model } = this.plugin;
    model.edit({ status }, { source: 'edit.cell.view' });
    cell.mode(status);
  }

  getCommands() {
    const { model, table } = this.plugin;

    const commands = {
      enter: new Command({
        priority: 1,
        source: 'edit.cell.view',
        shortcut: this.shortcutFactory('enter'),
        canExecute: cell => {
          // TODO: source should be set up from outside
          const source = cell ? 'mouse' : 'keyboard';
          if (source === 'keyboard') {
            const keyCode = this.shortcut.keyCode();
            // as we using wildcard we are filtering this command here
            // be checking if pressed key is 'tab' or 'ctrl' etc.
            // todo: make it better
            if (Shortcut.isControl(keyCode)) {
              return false;
            }
          }

          cell = cell || model.navigation().cell;

          // cell is an array when using custom template
          if (Array.isArray(cell)) {
            if (cell.length > 0) {
              if (cell[0].constructor.name === 'TdCoreDirective') {
                cell = cell[0];
              }
            }
          }

          return cell
            && cell.column.canEdit
            && (cell.column.category === 'control' || model.edit().mode === 'cell')
            && model.edit().status === 'view'
            && model.edit().enter.canExecute(this.contextFactory(cell, cell.value, cell.label));
        },
        execute: (cell, e) => {
          Log.info('cell.edit', 'edit mode');
          if (e) {
            e.stopImmediatePropagation();
          }

          // TODO: source should be set up from outside
          const source = cell ? 'mouse' : 'keyboard';
          cell = cell || model.navigation().cell;
          if (cell && model.edit().enter.execute(this.contextFactory(cell, cell.value, cell.label)) !== false) {
            const td = table.body.cell(cell.rowIndex, cell.columnIndex).model();
            this.editor = new CellEditor(td);

            const keyCode = this.shortcut.keyCode();
            if (source === 'keyboard' && Shortcut.isPrintable(keyCode)) {
              const parse = parseFactory(cell.column.type, cell.column.editor);
              const value = Shortcut.stringify(keyCode);
              const typedValue = parse(value);
              if (typedValue !== null) {
                this.value = typedValue;
              }
            }

            this.mode(this.editor.td, 'edit');
            return true;
          }

          return false;
        },
      }),
      commit: new Command({
        priority: 1,
        source: 'edit.cell.view',
        shortcut: this.shortcutFactory('commit'),
        canExecute: cell => {
          cell = cell || this.editor.td;
          const canEdit = cell
            && Td.equals(cell, this.editor.td)
            && cell.column.canEdit
            && (cell.column.category === 'control' || model.edit().mode === 'cell')
            && model.edit().status === 'edit';
          if (canEdit) {
            const context = this.contextFactory(cell, this.value, this.label, this.tag);
            const key = context.column.key;
            const validator = validationService.createValidator(model.validation().rules, key);
            return model.edit().commit.canExecute(context) && validator.validate({ [key]: this.value }) !== false;
          }
          return false;
        },
        execute: (cell, e) => {
          Log.info('cell.edit', 'commit');
          if (e) {
            e.stopImmediatePropagation();
          }

          cell = cell || this.editor.td;
          if (cell && model.edit().commit.execute(this.contextFactory(cell, this.value, this.label, this.tag)) !== false) {
            this.editor.commit();
            this.editor = CellEditor.empty;
            this.requestClose = null;

            this.mode(cell, 'view');
            table.view.focus();

            return true;
          }

          return false;
        },
      }),
      push: new Command({
        priority: 1,
        source: 'edit.cell.view',
        canExecute: cell => {
          cell = cell || this.editor.td;
          const canEdit = cell && cell.column.canEdit;
          if (canEdit) {
            const context = this.contextFactory(cell, this.value, this.label, this.tag);
            const key = context.column.key;
            const validator = validationService.createValidator(model.validation().rules, key);
            return model.edit().commit.canExecute(context) && validator.validate({ [key]: this.value }) !== false;
          }

          return false;
        },
        execute: (cell, e) => {
          Log.info('cell.edit', 'batch commit');
          if (e) {
            e.stopImmediatePropagation();
          }

          cell = cell || this.editor.td;
          if (cell && model.edit().commit.execute(this.contextFactory(cell, this.value, this.label, this.tag)) !== false) {
            this.editor.commit();
            this.editor = CellEditor.empty;
            this.requestClose = null;

            return true;
          }

          return false;
        },
      }),
      cancel: new Command({
        priority: 1,
        source: 'edit.cell.view',
        shortcut: this.shortcutFactory('cancel'),
        canExecute: cell => {
          cell = cell || this.editor.td;
          return cell
            && cell.column.canEdit
            && (cell.column.category === 'control' || model.edit().mode === 'cell')
            && model.edit().status === 'edit'
            && model.edit().cancel.canExecute(this.contextFactory(cell, this.value, this.label));
        },
        execute: (cell, e) => {
          Log.info('cell.edit', 'cancel');
          if (e) {
            e.stopImmediatePropagation();
          }

          cell = cell || this.editor.td;
          if (cell && model.edit().cancel.execute(this.contextFactory(cell, this.value, this.label)) !== false) {
            this.editor.reset();
            this.editor = CellEditor.empty;
            this.requestClose = null;

            this.mode(cell, 'view');
            table.view.focus();

            return true;
          }

          return false;
        },
      }),
      reset: new Command({
        priority: 1,
        source: 'edit.cell.view',
        canExecute: cell => {
          cell = cell || this.editor.td;
          return cell
            && cell.column.canEdit
            && (cell.column.category === 'control' || model.edit().mode === 'cell')
            && model.edit().status === 'edit'
            && model.edit().reset.canExecute(this.contextFactory(cell, this.value, this.label));
        },
        execute: (cell, e) => {
          Log.info('cell.edit', 'reset');
          if (e) {
            e.stopImmediatePropagation();
          }

          cell = cell || this.editor.td;
          if (cell && model.edit().reset.execute(this.contextFactory(cell, this.value, this.label)) !== false) {
            this.editor.reset();
            return true;
          }

          return false;
        },
      }),
      exit: new Command({
        priority: 1,
        source: 'edit.cell.view',
        execute: (cell, e) => {
          Log.info('cell.edit', 'reset');
          if (e) {
            e.stopImmediatePropagation();
          }

          cell = cell || this.editor.td;
          if (cell) {
            if (this.commit.canExecute(cell, e)) {
              const originValue = cell.value;
              const editValue = this.value;
              if (originValue !== editValue) {
                this.commit.execute(cell, e);
                return true;
              }
            }

            if (this.cancel.canExecute(cell, e)) {
              this.cancel.execute(cell, e);
              return true;
            }
          }

          return false;
        },
      }),
      clear: new Command({
        priority: 1,
        source: 'edit.cell.view',
        canExecute: cell => {
          cell = cell || this.editor.td;
          return cell
            && cell.column.canEdit
            && (cell.column.category === 'control' || model.edit().mode === 'cell')
            && model.edit().status === 'edit'
            && model.edit().clear.canExecute(this.contextFactory(cell, this.value, this.label));
        },
        execute: (cell, e) => {
          Log.info('cell.edit', 'clear');
          if (e) {
            e.stopImmediatePropagation();
          }

          cell = cell || this.editor.td;
          if (cell && model.edit().clear.execute(this.contextFactory(cell, this.value, this.label)) !== false) {
            this.editor.clear();
            return true;
          }

          return false;
        },
      }),
    };

    return new Map(
      Object.entries(commands),
    );
  }

  contextFactory(cell, newValue, newLabel, tag) {
    const { column, row, columnIndex, rowIndex, value: oldValue, label: oldLabel } = cell;
    return {
      column,
      row,
      columnIndex,
      rowIndex,
      oldValue,
      newValue,
      oldLabel,
      newLabel,
      unit: 'cell',
      tag,
      getValueFactory,
      getLabelFactory,
    };
  }

  canEdit(cell) {
    const { model } = this.plugin;

    if (cell) {
      return cell.column.canEdit && model.edit().mode === 'cell';
    }

    return false;
  }

  shortcutFactory(type) {
    const { model } = this.plugin;
    const { edit } = model;
    return () => {
      const shortcuts = edit()[type + 'Shortcuts'];
      const { td } = this.editor;
      if (td) {
        const type = td.column && td.column.editor ? td.column.editor : td.column.type;
        if (shortcuts && hasOwnProperty.call(shortcuts, type)) {
          return shortcuts[type];
        }
      }

      return shortcuts['$default'];
    };
  }
}
