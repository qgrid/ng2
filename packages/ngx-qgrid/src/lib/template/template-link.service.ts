import { Injectable } from '@angular/core';
import { TemplateLink } from './template-link';

@Injectable()
export class TemplateLinkService {
	private cache: Map<string, TemplateLink> = new Map();

	get(key: string): TemplateLink | null {
		return this.cache.get(key) || null;
	}

	put(key: string, value: TemplateLink) {
		this.cache.set(key, value);
	}
}
