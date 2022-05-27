import { Component, Input } from '@angular/core';
import { EbNodeService } from './eb-node.service';
import { Node } from './model/node';

@Component({
  selector: 'q-grid-eb-node',
  templateUrl: './eb-node.component.html',
})
export class EbNodeComponent {
  @Input() model: Node;

  constructor(
    public service: EbNodeService,
  ) { }

  select(e: MouseEvent) {
    e.stopPropagation();

    if (this.model.parent) {
      this.service.current = this.model;
    }
  }
}
