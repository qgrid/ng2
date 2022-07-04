import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Action } from '@qgrid/core';
import { GridPlugin } from '@qgrid/ngx';

@Component({
  selector: 'q-grid-action-bar',
  templateUrl: './action-bar.component.html',
  providers: [GridPlugin],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionBarComponent implements OnInit {

  // eslint-disable-next-line no-use-before-define
  context: { $implicit: ActionBarComponent } = {
    $implicit: this,
  };

  get actions(): Action[] {
    const { model } = this.plugin;
    return model.action().items;
  }

  constructor(
    private plugin: GridPlugin,
    private cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    const { model, observeReply } = this.plugin;

    observeReply(model.actionChanged)
      .subscribe(e => {
        if (e.hasChanges('items')) {
          const { items } = e.state;
          const inRightOrder = this.checkOrder(items);

          if (!inRightOrder) {
            // todo: make it better
            model.action({
              items: items.sort((a: Action, b: Action) => a.command.priority - b.command.priority),
            });
          }

          this.cd.markForCheck();
          this.cd.detectChanges();
        }
      });
  }

  private checkOrder(actions: Action[]): boolean {
    for (let i = 0; i < actions.length - 1; i++) {
      const action = actions[i];
      const nextAction = actions[i + 1];
      if (action.command.priority > nextAction.command.priority) {
        return false;
      }
    }

    return true;
  }
}
