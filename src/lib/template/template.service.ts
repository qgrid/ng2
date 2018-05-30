import {
	Injectable,
	TemplateRef,
	ViewContainerRef,
	EmbeddedViewRef
} from '@angular/core';
import { TemplateLink } from './template-link';
import { Guard } from 'ng2-qgrid/core/infrastructure/guard';
import { AppError } from 'ng2-qgrid/core/infrastructure/error';
import { isString, isArray } from 'ng2-qgrid/core/utility/kit';
import { TemplateLinkService } from './template-link.service';
import { TemplateCacheService } from './template-cache.service';

@Injectable()
export class TemplateService {
	constructor(
		private templateLink: TemplateLinkService,
		private templateCache: TemplateCacheService
	) {}

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
