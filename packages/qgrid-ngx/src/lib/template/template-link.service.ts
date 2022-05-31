import { Injectable } from '@angular/core';
import { TemplateLink } from './template-link';

@Injectable()
export class TemplateLinkService {
  private cache: Map<string, TemplateLink> = new Map();

  get(key: string): TemplateLink | undefined {
    return this.cache.get(key);
  }

  put(key: string, value: TemplateLink): void {
    this.cache.set(key, value);
  }
}
