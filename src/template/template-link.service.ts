import { Injectable, TemplateRef } from '@angular/core';
import { TemplateLink } from './template-link';

@Injectable()
export class TemplateLinkService {
	private cache: Map<string, TemplateLink> = new Map();

	constructor() {
	}

	get(key: string): TemplateLink {
		return this.cache.get(key);
	}

	put(key: string, value: TemplateLink) {
		this.cache.set(key, value);
	}
}
