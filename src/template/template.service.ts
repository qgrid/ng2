import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { TemplateLink } from './template-link';
import { Guard, AppError } from 'ng2-qgrid/core/infrastructure';
import { isString, isArray } from 'ng2-qgrid/core/utility';
import { TemplateLinkService } from './template-link.service';
import { TemplateCacheService } from './template-cache.service';

@Injectable()
export class TemplateService {
	constructor(private templateLink: TemplateLinkService, private templateCache: TemplateCacheService) {
	}

	public viewFactory(context: object) {
		return (link: TemplateLink, viewContainerRef: ViewContainerRef) => {
			const template = link.template;
			const locals = context;
			return viewContainerRef.createEmbeddedView(template, locals);
		};
	}

	public find(keys: string | string[]): TemplateLink {
		if (isString(keys)) {
			const key = keys as string;
			const link = this.templateCache.get(key) || this.templateLink.get(key);
			return link || null;
		}

		if (isArray(keys)) {
			for (const key of keys) {
				const link = this.find(key);
				if (link) {
					return link;
				}
			}

			return null;
		}
	}
}
