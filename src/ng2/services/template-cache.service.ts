import {Injectable} from '@angular/core';

@Injectable()
export class TemplateCacheService {
  private cache: Map<string, string> = new Map();

  constructor() {
  }

  get(key: string) {
    return this.cache.get(key);
  }

  put(key: string, value: string) {
    this.cache.set(key, value);
  }
}
