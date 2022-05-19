import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Watcher } from './digest/watch';
import { Expression } from './model/expression';
import { Line } from './model/line';
import { Node } from './model/node';

@Component({
  selector: 'q-grid-eb-expression',
  templateUrl: './eb-expression.component.html',
})
export class EbExpressionComponent implements OnInit, DoCheck {
  private watchers: Watcher[];

  @Input() node: Node;
  @Input() line: Line;
  @Input() model: Expression;

  context: { $implicit: Expression; node: Node; line: Line };

  ngOnInit() {
    this.context = { $implicit: this.model, node: this.node, line: this.line };

    const { $watch } = this.model;
    if ($watch) {
      this.watchers =
        Object
          .keys($watch)
          .map(key =>
            new Watcher(
              this.model,
              key,
              $watch[key],
              [this.node, this.line],
            ),
          );
    }
  }

  ngDoCheck() {
    const ws = this.watchers;
    if (!ws) {
      return;
    }

    for (let i = 0, length = ws.length; i < length; i++) {
      ws[i].detect();
    }
  }
}
