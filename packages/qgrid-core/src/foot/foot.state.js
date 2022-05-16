import { Cache } from '../infrastructure/cache';
import { EnumerableResource } from '../resource/resource.enumerable';

export class FootState {
  constructor() {
    this.resource = new EnumerableResource();
    this.cache = new Cache();
  }
}
