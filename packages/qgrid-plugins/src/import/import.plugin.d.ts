import { Model } from '@qgrid/core';

export declare interface ImportOptions {
	head: 'alpha' | 'numeric' | 'default';
}
export declare class ImportPlugin {
  constructor(model: Model, element: HTMLElement, options?: ImportOptions);

  load(e: any): void;
  upload(): void;
}
