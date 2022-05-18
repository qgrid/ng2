import { Injectable } from '@angular/core';
import { isArray, isString } from '@qgrid/core';
import { TemplateCacheService } from './template-cache.service';
import { TemplateLink } from './template-link';
import { TemplateLinkService } from './template-link.service';

@Injectable()
export class TemplateService {
  constructor(
		private templateLink: TemplateLinkService,
		private templateCache: TemplateCacheService,
  ) { }

  find(keys: string | string[]): TemplateLink | null {
    if (isString(keys)) {
      const key = keys as string;
      const link = this.templateCache.get(key) || this.templateLink.get(key);
      return link || null;
    }

    if (isArray(keys)) {
      return this.lookInCache(keys) || this.lookInLink(keys);
    }

    return null;
  }

  private lookInCache(keys: any) {
    for (const key of keys) {
      const link = this.templateCache.get(key);
      if (link) {
        return link;
      }
    }

    return null;
  }

  private lookInLink(keys: any) {
    for (const key of keys) {
      const link = this.templateLink.get(key);
      if (link) {
        return link;
      }
    }

    return null;
  }
}
