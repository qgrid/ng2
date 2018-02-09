import { Injectable, ViewContainerRef } from '@angular/core';
import { Layer } from './layer';
import { TemplateService } from 'ng2-qgrid/template/template.service';
import { noop } from 'ng2-qgrid/core/utility/index';

@Injectable()
export class LayerService {
	public viewContainerRef: ViewContainerRef;

	constructor(private templateService: TemplateService) {
	}

	create(name) {
		const link = this.templateService.find(`${name}-layer.tpl.html`);
		if (link) {
			const createView = this.templateService.viewFactory({});
			createView(link, this.viewContainerRef);
			return new Layer(() => this.viewContainerRef.clear());
		}

		return new Layer(noop);
	}
}
