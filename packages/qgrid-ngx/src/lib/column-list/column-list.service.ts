import { Injectable } from '@angular/core';
import {
  ColumnListHost,
  ColumnModel,
  isUndefined,
  Lazy,
  parseFactory,
} from '@qgrid/core';
import { GridPlugin } from '../plugin/grid-plugin';

@Injectable()
export class ColumnListService {
  private host = new Lazy(() => {
    const canCopy = (key: string, source: unknown, target: unknown) =>
      Object.prototype.hasOwnProperty.call(target, key) && !isUndefined(source[key]);

    return new ColumnListHost(this.plugin.model, canCopy, parseFactory);
  });

  constructor(private plugin: GridPlugin) {
  }

  add(column: ColumnModel): void {
    this.host.instance.add(column);
  }

  copy(target: any, source: any): void {
    this.host.instance.copy(target, source);
  }

  generateKey(source: any): string {
    return this.host.instance.generateKey(source);
  }

  extract(key: string, type: string): ColumnModel {
    return this.host.instance.extract(key, type);
  }

  register(column: ColumnModel): void {
    this.host.instance.register(column);
  }

  delete(key: string): void {
    this.host.instance.delete(key);
  }
}
