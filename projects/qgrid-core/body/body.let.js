import { EventListener } from '../event/event.listener';
import { EventManager } from '../event/event.manager';
import { Log } from '../infrastructure/log';
import { Renderer } from '../scene/render/render';

export class BodyLet {
	constructor(plugin) {
		const { model, observe, disposable } = plugin;
		const render = new Renderer(plugin);

		this.plugin = plugin;
		this.render = render;
		this.columns = pin => render.defaultStrategy.columnList(pin);
		this.selectedNodes = [];

		observe(model.sceneChanged)
			.subscribe(e => {
				if (e.hasChanges('rows')) {
					this.tryShowBlankLayer();
				}
			});
		
		const { view } = plugin.table.box.markup;
		const manager = new EventManager(this);

		disposable.add(new EventListener(view, manager).on('contextmenu', event => this.selectTextInNode(event.target)));
		disposable.add(new EventListener(document, manager).on('click', this.removeSelections));
		disposable.add(new EventListener(window, manager).on('blur', this.removeSelections));

		this.tryShowBlankLayer();
	}

	tryShowBlankLayer() {
		Log.info('view.let', 'invalidate');

		const { model, table } = this.plugin;
		const { rows } = model.scene();

		if (!(rows.length || model.data().rows.length)) {
			if (!table.view.hasLayer('blank')) {
				table.view.addLayer('blank');
			}
		} else {
			if (table.view.hasLayer('blank')) {
				table.view.removeLayer('blank');
			}
		}
	}

	removeSelections() {
		this.selectedNodes.forEach(this.removeSelection);
		this.selectedNodes = [];
	}

	removeSelection(node) {
		if (node && node.removeAttribute) {
			node.removeAttribute('style');
		}
	}

	selectTextInNode(node) {
		node.setAttribute('style', 'user-select: auto;');
		if (document.body.createTextRange) {
			const range = document.body.createTextRange();
			range.moveToElementText(node);
			range.select();
		} else if (window.getSelection) {
			const selection = window.getSelection();
			const range = document.createRange();
			range.selectNodeContents(node);
			selection.removeAllRanges();
			selection.addRange(range);
		} else {
			console.warn("Could not select text in node: Unsupported browser.");
		}
		this.selectedNodes.push(node);
	}
}
