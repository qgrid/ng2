import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Shortcut } from '@qgrid/core';
import { GridPlugin } from '@qgrid/ngx';

@Component({
  selector: 'q-grid-pager-target',
  templateUrl: './pager-target.component.html',
  providers: [GridPlugin],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagerTargetComponent implements OnInit {
  private value: number;

  // eslint-disable-next-line no-use-before-define
  context: { $implicit: PagerTargetComponent } = {
    $implicit: this,
  };

  get current() {
    return this.plugin.model.pagination().current + 1;
  }

  get total() {
    const { count, size } = this.plugin.model.pagination();
    return size === 0 ? 0 : Math.max(1, Math.ceil(count / size));
  }

  constructor(private plugin: GridPlugin) {
  }

  ngOnInit() {
    this.value = this.current;
  }

  keyDown(e: KeyboardEvent) {
    let code = Shortcut.translate(e);
    if (code.startsWith('numpad')) {
      code = code.slice(6);
    }

    const value = this.value || 0;

    switch (code) {
      case 'enter': {
        if (value) {
          const current = value - 1;
          if (this.plugin.model.pagination().current !== current) {
            // new FocusAfterRender(this.plugin);
            this.plugin.model.pagination({
              current,
            }, {
              source: 'pager-target.component',
            });
          }
        }
        break;
      }
      case 'up': {
        if (value < this.total) {
          this.value = value + 1;
        }
        break;
      }
      case 'down': {
        if (value > 1) {
          this.value = value - 1;
        }
        break;
      }
      case 'left':
      case 'right':
      case 'backspace': {
        break;
      }
      default: {
        const digit = Number.parseInt(code, 10);
        const page = Number.parseInt('' + value + digit, 10);
        const min = 1;
        const max = this.total;
        const isValid = page >= min && page <= max && !isNaN(digit);

        if (!isValid) {
          this.value = page > this.total ? max : min;
          e.preventDefault();
        }
      }
    }
  }
}
