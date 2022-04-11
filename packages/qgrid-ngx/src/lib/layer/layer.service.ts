import { Injectable, ViewContainerRef } from '@angular/core';
import { TemplateService } from '../template/template.service';
import { Layer } from './layer';

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
			this.getHostElement()?.classList.add(`q-grid-${name}`);
			const embeddedViewRef = container.createEmbeddedView(link.template, {});


			const destroy = () => {
				this.layers.delete(name);
				const { nativeElement } = container.element;
				nativeElement.parentElement.classList.remove(`q-grid-layer-${name}`);
				this.getHostElement()?.classList.remove(`q-grid-${name}`);
				embeddedViewRef.destroy();
			}

			const layer = new Layer(destroy);
			this.layers.set(name, layer);
			return layer;
		}

		const noopLayer =  new Layer(() => this.layers.delete(name));

		this.layers.set(name, noopLayer);
		return noopLayer;
	}

	get count() {
		return this.layers.size;
	}

	private getHostElement() {
		const { nativeElement } = this.container.element;
		for (let el = nativeElement; !!el; el = el.parentElement) {
			if (el.tagName == 'Q-GRID') {
				return el;
			}
		}
		return null;	
	}
}
