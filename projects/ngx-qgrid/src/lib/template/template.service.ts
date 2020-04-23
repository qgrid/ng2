import { Injectable, ViewContainerRef, EmbeddedViewRef } from '@angular/core';
import { isString, isArray } from '@qgrid/core/utility/kit';
import { TemplateLink } from './template-link';
import { TemplateLinkService } from './template-link.service';
import { TemplateCacheService } from './template-cache.service';

@Injectable()
export class TemplateService {
	constructor(
		private templateLink: TemplateLinkService,
		private templateCache: TemplateCacheService
	) { }

	viewFactory(context: any) {
		return (link: TemplateLink, viewContainerRef: ViewContainerRef): EmbeddedViewRef<any> => {
			const { template } = link;
			return viewContainerRef.createEmbeddedView(template, context);
		};
	}

	find(keys: string | string[]): TemplateLink {
		if (isString(keys)) {
			const key = keys as string;
			const link = this.templateCache.get(key) || this.templateLink.get(key);
			return link || null;
		}

		if (isArray(keys)) {
			return this.lookInCache(keys) || this.lookInLink(keys);
		}
	}

	private lookInCache(keys) {
		for (const key of keys) {
			const link = this.templateCache.get(key);
			if (link) {
				return link;
			}
		}

		return null;
	}

	private lookInLink(keys) {
		for (const key of keys) {
			const link = this.templateLink.get(key);
			if (link) {
				return link;
			}
		}

		return null;
	}
}
