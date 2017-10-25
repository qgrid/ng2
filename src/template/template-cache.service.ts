import { Injectable, TemplateRef } from '@angular/core';
import { TemplateLink } from './template-link';

@Injectable()
export class TemplateCacheService {
	private cache: Map<string, TemplateRef<any>> = new Map();

	constructor() {
	}

	get(key: string): TemplateRef<any> {
		return this.cache.get(key);
	}

	put(key: string, value: TemplateRef<any>) {
		this.cache.set(key, value);
	}
}
