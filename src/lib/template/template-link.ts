import { TemplateRef } from '@angular/core';

export class TemplateLink {
	constructor(public template: TemplateRef<any>, public context: object) {
	}
}
