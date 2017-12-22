import { Directive, DoCheck, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { TemplateLinkService } from './template-link.service';
import { TemplateCacheService } from './template-cache.service';
import { Guard, AppError } from 'ng2-qgrid/core/infrastructure';
import { isString, isArray } from 'ng2-qgrid/core/utility';
import { TemplateLink } from './template-link';
import { TemplateService } from './template.service';

@Directive({
	selector: 'ng-container[key]'
})
export class TemplateDirective implements DoCheck {
	@Input() key: any = '';
	@Input() context = null;
	private link: TemplateLink = null;
	private viewRef: EmbeddedViewRef<any>;

	constructor(private templateService: TemplateService, private viewContainerRef: ViewContainerRef) {
	}

	ngDoCheck() {
		const link = this.templateService.find(this.key);
		if (link !== this.link) {
			this.link = link;
			if (this.viewRef) {
				this.viewContainerRef.clear();
			}

			const createView = this.templateService.viewFactory(this.context);
			this.viewRef = createView(link, this.viewContainerRef);
		}
	}
}
