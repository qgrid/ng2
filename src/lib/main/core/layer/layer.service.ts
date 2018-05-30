import { Injectable, ViewContainerRef } from '@angular/core';
import { Layer } from './layer';
import { TemplateService } from '../../../template/template.service';

@Injectable()
export class LayerService {
	private container: ViewContainerRef;
	private layers = new Map<string, Layer>();

	constructor(private templateService: TemplateService) {
	}

	init(container: ViewContainerRef) {
		this.container = container;

		const layers = this.layers;
		this.layers = new Map();
		for (const key of Array.from(layers.keys())) {
			this.create(key);
		}
	}

	create(name) {
		if (this.layers.has(name)) {
			return this.layers.get(name);
		}

		const container = this.container;
		const link = this.templateService.find(`${name}-layer.tpl.html`);
		if (link && container) {
			const createView = this.templateService.viewFactory({});
			createView(link, container);
		}

		const layer = new Layer(() => {
			this.layers.delete(name);
			if (this.container) {
				this.container.clear();
			}
		});

		this.layers.set(name, layer);
		return layer;
	}

	get count() {
		return this.layers.size;
	}
}
