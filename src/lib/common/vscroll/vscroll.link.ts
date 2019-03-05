import { VscrollPort } from './vscroll.port';
import { VscrollBox } from './vscroll.box';
import { isNumber } from 'ng2-qgrid/core/utility/kit';

export class VscrollLink {
	private box = new VscrollBox();
	private ticking = false;

	constructor(private port: VscrollPort) {
		const { view, layout } = port;
		const { settings, container } = this;

		if (settings.placeholderHeight > 0 || settings.placeholderWidth > 0) {
			const width = settings.placeholderWidth || (isNumber(settings.columnWidth) && settings.columnWidth as number);
			const height = settings.placeholderHeight || (isNumber(settings.rowHeight) && settings.rowHeight as number);
			view.drawPlaceholder(width, height);
		}

		view.scrollEvent.subscribe(() => this.update(false));

		view.resetEvent.subscribe(e => {
			if (e.handled) {
				return;
			}

			e.handled = settings.resetTriggers.indexOf(e.source) < 0;
			container.resetEvent.emit(e);
		});

		container.resetEvent.subscribe(e => {
			if (e.handled) {
				return;
			}

			container.cursor = layout.reset();
			port.reset();
		});

		container.updateEvent.subscribe(e => {
			const { rowHeight, columnWidth } = settings;
			const forceByContSize = (isNumber(rowHeight) && rowHeight > 0) || (isNumber(columnWidth) && columnWidth > 0);
			const forceByCount = !this.port.layout.isSynced();
			const forceBySource = e.source === 'fetch';

			if (forceByContSize || forceBySource) {
				this.update(true);
			}
		});
	}

	tick(force: boolean) {
		this.ticking = false;

		const { port, container, box } = this;
		const position = port.layout.recycle(container.count, box, force);
		if (position) {
			const draw = () => {
				container.cursor = port.layout.invalidate(position);
				container.drawEvent.emit({
					position: this.container.cursor
				});
			};

			const emit = f => port.emit(f, force);

			console.log('DRAW');
			container.apply(draw, emit);
		}
	}

	update(force = false) {
		const { view } = this.port;
		this.container.read(() => {
			const element = view.element;
			const newBox = {
				scrollWidth: element.scrollWidth,
				scrollHeight: element.scrollHeight,
				scrollTop: element.scrollTop,
				scrollLeft: element.scrollLeft,
				portWidth: element.clientWidth,
				portHeight: element.clientHeight
			};

			if (force || this.port.hasChanges(newBox, this.box)) {
				this.box = newBox;
				if (!this.ticking) {
					this.ticking = true;
					this.container.tick(() => this.tick(force));
				}
			}
		});
	}

	private get settings() {
		return this.port.context.settings;
	}

	private get container() {
		return this.port.context.container;
	}
}
