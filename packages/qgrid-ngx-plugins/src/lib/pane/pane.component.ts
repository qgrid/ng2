import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { isUndefined, NotifyModel, ReadModel, Table } from '@qgrid/core';
import { GridError, GridEvent, GridPlugin, TemplateHostService } from '@qgrid/ngx';

type PaneSide = 'left' | 'right';
const DEFAULT_SIDE: PaneSide = 'right';

type PaneTriggerOn = keyof ReadModel;
type PaneTriggerFor<K extends keyof ReadModel> = keyof ReturnType<ReadModel[K]>;

@Component({
  selector: 'q-grid-pane',
  templateUrl: './pane.component.html',
  providers: [GridPlugin, TemplateHostService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaneComponent implements OnInit {
  @Input() trigger: string;

  context: {
    [side in PaneSide]?: {
      // eslint-disable-next-line no-use-before-define
      $implicit: PaneComponent;
      value: unknown;
    }
  };

  constructor(
    private plugin: GridPlugin,
    private cd: ChangeDetectorRef,
    templateHost: TemplateHostService,
  ) {
    templateHost.key = source => `plugin-pane-${source}.tpl.html`;

    this.context = {
      left: {
        $implicit: this,
        value: null,
      },
      right: {
        $implicit: this,
        value: null,
      },
    };
  }

  ngOnInit() {
    const { model, observeReply } = this.plugin;
    const scope = this.parse();
    if (scope) {
      const [state, prop] = scope;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      observeReply(model[`${state}Changed` as keyof NotifyModel] as GridEvent<any>)
        .subscribe({
          next: e => {
            if (!prop || e.hasChanges(prop)) {
              this.open(DEFAULT_SIDE);
            }
          },
        });
    }
  }

  open(side: PaneSide = DEFAULT_SIDE, value?: unknown) {
    const { table, model }: { table: Table; model: ReadModel } = this.plugin;

    const scope = this.parse();
    if (scope && isUndefined(value)) {
      const [state, prop] = scope;
      value = model[state]()[prop as PaneTriggerFor<keyof ReadModel>];
    }

    this.context[side] = { $implicit: this, value };

    const paneLayer = `pane-${side}`;
    if (table.view.hasLayer(paneLayer)) {
      table.view.removeLayer(paneLayer);
    }
    table.view.addLayer(paneLayer);

    this.invalidate();
  }

  close(side: PaneSide = DEFAULT_SIDE) {
    const { table } = this.plugin;

    table.view.removeLayer(`pane-${side}`);

    this.context[side] = null;

    this.invalidate();
  }

  private invalidate(): void {
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  private parse() {
    const { model } = this.plugin;
    const parts = (this.trigger ? this.trigger.split('.') : []) as [PaneTriggerOn, PaneTriggerFor<PaneTriggerOn>];

    if (parts.length > 0) {
      const [state, prop] = parts;
      if (!model[state]) {
        throw new GridError('pane.component', `Trigger ${state} not found`);
      }
      return [state, prop];
    }

    return null;
  }
}
