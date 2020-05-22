import { Injectable, ViewContainerRef } from '@angular/core';
import { Layer } from './layer';
import { TemplateService } from '../template/template.service';

@Injectable()
export class LayerService {
	private container: ViewContainerRef;
	private layers = new Map<string, Layer>();

	constructor(private templateService: TemplateService) {
	}

	init(container: ViewContainerRef) {
		this.container = container;
	}

	create(name) {
		if (this.layers.has(name)) {
			return this.layers.get(name);
		}

		const { container, templateService } = this;
		const link = templateService.find(`layer-${name}.tpl.html`);
		if (link && container) {
			const { nativeElement } = container.element;
			nativeElement.parentElement.classList.add(`q-grid-layer-${name}`);

			container.createEmbeddedView(link.template, {});
		}

		const destroy = container
			? () => {
				this.layers.delete(name);
				const { nativeElement } = container.element;
				nativeElement.parentElement.classList.add(`q-grid-layer-${name}`);
				container.clear();
			}
			: () => this.layers.delete(name);

		const layer = new Layer(destroy);
		this.layers.set(name, layer);
		return layer;
	}

	get count() {
		return this.layers.size;
	}
}
