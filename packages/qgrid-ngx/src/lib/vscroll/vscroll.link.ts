import { isNumber } from '@qgrid/core';
import { VscrollBox } from './vscroll.box';
import { VscrollDirective } from './vscroll.directive';
import { VscrollPort } from './vscroll.port';

export class VscrollLink {
  private box = new VscrollBox();
  private ticking = false;

  private get settings() {
    return this.port.context.settings;
  }

  private get container() {
    return this.port.context.container;
  }

  constructor(
		private port: VscrollPort,
		private view: VscrollDirective,
  ) {
    const { layout } = port;
    const { settings, container } = this;

    if (settings.placeholderHeight > 0 || settings.placeholderWidth > 0) {
      const width = settings.placeholderWidth || (isNumber(settings.columnWidth) && settings.columnWidth as number);
      const height = settings.placeholderHeight || (isNumber(settings.rowHeight) && settings.rowHeight as number);
      view.drawPlaceholder(width as number, height as number);
    }

    view.scroll.subscribe(() => this.update(false));

    view.reset.subscribe(e => {
      if (e.handled) {
        return;
      }

      e.handled = settings.resetTriggers.indexOf(e.source) < 0;
      container.reset$.emit(e);
    });

    container.reset$.subscribe(e => {
      if (e.handled) {
        return;
      }

      if (layout) {
        container.position = layout.reset();
      }
      port.reset();

      container.fetchPage(0);
    });

    container.update$.subscribe(() => this.update(true));
  }

  tick(force: boolean) {
    this.ticking = false;

    const { port, container, box } = this;
    const count = container.count;
    if(!port.layout) {
      return;
    }
    const position = port.layout.recycle(count, box, force);
    if (position) {
      const draw = () => {
        if (port.layout) {
          container.position = port.layout.invalidate(position);
          container.draw$.emit({
            position: container.position,
          });
        }
      };

      const emit = (f: () => void) => port.emit(f);
      container.apply(draw, emit);
    }
  }

  update(force: boolean) {
    const { container, port, box } = this;
    const { element } = this.view;

    this.container.read(() => {
      const newBox = {
        scrollWidth: element.scrollWidth,
        scrollHeight: element.scrollHeight,
        scrollTop: element.scrollTop,
        scrollLeft: element.scrollLeft,
        portWidth: element.clientWidth,
        portHeight: element.clientHeight,
      };

      if (force || port.hasChanges(newBox, box)) {
        this.box = newBox;
        if (container.count && !this.ticking) {
          this.ticking = true;
          container.tick(() => this.tick(force));
        }
      }
    });
  }
}
