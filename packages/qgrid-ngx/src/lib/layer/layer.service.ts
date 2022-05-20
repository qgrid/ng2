import { Injectable, ViewContainerRef } from '@angular/core';
import { TemplateService } from '../template/template.service';
import { Layer } from './layer';

@Injectable()
export class LayerService {
  private container: ViewContainerRef;
  private layers = new Map<string, Layer>();

  get count() {
    return this.layers.size;
  }

  constructor(private templateService: TemplateService) {
  }

  init(container: ViewContainerRef): void {
    this.container = container;
  }

  create(name: string): Layer | undefined {
    if (this.layers.has(name)) {
      return this.layers.get(name);
    }

    const { container, templateService } = this;
    const link = templateService.find(`layer-${name}.tpl.html`);
    if (link && container) {
      const { nativeElement } = container.element;
      nativeElement.parentElement.classList.add(`q-grid-layer-${name}`);
      this.getHostElement()?.classList.add(`q-grid-${name}`);
      container.createEmbeddedView(link.template, {});
    }

    const destroy = container
      ? () => {
        this.layers.delete(name);
        const { nativeElement } = container.element;
        nativeElement.parentElement.classList.add(`q-grid-layer-${name}`);
        this.getHostElement()?.classList.remove(`q-grid-${name}`);
        container.clear();
      }
      : () => this.layers.delete(name);

    const layer = new Layer(destroy);
    this.layers.set(name, layer);
    return layer;
  }

  private getHostElement(): HTMLElement | null {
    const { nativeElement } = this.container.element;
    for (let el = nativeElement; el; el = el.parentElement) {
      if (el.tagName === 'Q-GRID') {
        return el;
      }
    }
    return null;
  }
}
