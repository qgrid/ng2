import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CellView, Command, SelectionService } from '@qgrid/core';
import { Disposable, GridModel } from '@qgrid/ngx';

@Component({
  selector: 'q-grid-reference-editor',
  templateUrl: './reference-editor.component.html',
  providers: [Disposable],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferenceEditorComponent<T> implements AfterViewInit {
  private state: T;

  @Output() valueChange = new EventEmitter<T>();
  @Output() afterSubmit = new EventEmitter();
  @Output() afterCancel = new EventEmitter();

  @Input() caption = '';
  @Input() cell: CellView;

  reference: { commit: Command; cancel: Command };
  model: GridModel;

  // eslint-disable-next-line no-use-before-define
  context: { $implicit: ReferenceEditorComponent<T> } = {
    $implicit: this,
  };

  submit = new Command();
  cancel = new Command();

  @Input() get value() {
    return this.state;
  }
  set value(value) {
    if (value !== this.state) {
      this.state = value;
      this.valueChange.emit(value);
    }
  }

  constructor(private disposable: Disposable) { }

  ngAfterViewInit() {
    const { model } = this;
    const { commit, cancel } = this.reference;

    const { commitShortcuts, cancelShortcuts } = model.edit();
    const selectionService = new SelectionService(model);

    // TODO: think how to get rid of this shit.
    setTimeout(() => {
      this.submit = new Command({
        shortcut: commitShortcuts.form,
        canExecute: () => {
          const { items } = model.selection();
          const entries = selectionService.lookup(items);
          const context = { items, entries };

          return commit.canExecute(context);
        },
        execute: () => {
          const { items } = model.selection();
          const entries = selectionService.lookup(items);
          const context = { items, entries };
          if (commit.execute(context) !== false) {
            this.afterSubmit.emit();
          } else {
            this.afterCancel.emit();
          }

          return false;
        },
      });

      this.cancel = new Command({
        shortcut: cancelShortcuts.form || cancelShortcuts.$default,
        canExecute: () => cancel.canExecute(),
        execute: () => {
          if (cancel.execute() !== false) {
            this.afterCancel.emit();
          }

          return false;
        },
      });

      const { shortcut, manager } = model.action();
      this.disposable.add(
        shortcut.register(manager, [this.submit, this.cancel]),
      );
    }, 0);
  }
}
