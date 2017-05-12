import {Injectable, TemplateRef} from '@angular/core';

@Injectable()
export class TemplateLinkService {
  private cache: Map<string, TemplateRef<any>> = new Map();

  constructor() {
  }

  get(key) {
    return this.cache.get(key);
  }

  put(key, value) {
    this.cache.set(key, value);
  }
}
