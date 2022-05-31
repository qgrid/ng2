import { TemplateRef } from '@angular/core';

export class TemplateLink {
  constructor(public template: TemplateRef<unknown>, public context: unknown) {
  }
}
