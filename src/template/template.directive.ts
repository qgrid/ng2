import {Directive, DoCheck, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {TemplateLinkService} from './template-link.service';
import {TemplateCacheService} from './template-cache.service';
import {Guard, AppError} from 'ng2-qgrid/core/infrastructure';
import {isString, isArray} from 'ng2-qgrid/core/utility';

@Directive({
	selector: 'ng-container[key]'
})
export class TemplateDirective implements DoCheck {
	@Input() key: any = '';
	@Input() context = null;
	private template: TemplateRef<any> = null;
	private viewRef: EmbeddedViewRef<any>;

	constructor(private templateLink: TemplateLinkService,
					private templateCache: TemplateCacheService,
					private viewContainerRef: ViewContainerRef) {
	}

	ngDoCheck() {
		const template = this.find(this.key);
		if (template !== this.template) {
			this.template = template;
			if (this.viewRef) {
				this.viewContainerRef.clear();
			}

			this.viewRef = this.viewContainerRef.createEmbeddedView(template, this.context);
		}
	}

	private find(keys): TemplateRef<any> {
		if (isString(keys)) {
			const template = this.templateCache.get(keys) || this.templateLink.get(keys);
			return template || null;

		}

		if (isArray(keys)) {
			for (let key of keys) {
				const template = this.find(key);
				if (template) {
					return template;
				}
			}
			return null;
		}

		throw new AppError('template.directive', 'Invalid key type');
	}
}
