import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TemplateHostService } from '@qgrid/ngx';

@Component({
  selector: 'q-grid-legend',
  templateUrl: './legend.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TemplateHostService],
})
export class LegendComponent {
  // eslint-disable-next-line no-use-before-define
  context: { $implicit: LegendComponent } = {
    $implicit: this,
  };

  constructor(templateHost: TemplateHostService) {
    templateHost.key = () => 'plugin-legend-core.tpl.html';
  }
}
