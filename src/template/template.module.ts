import { NgModule } from '@angular/core';
import { TemplateDirective } from './template.directive';
import { TemplateLinkDirective } from './template-link.directive';
import { TemplateCacheDirective } from './template-cache.directive';

@NgModule({
	declarations: [
		TemplateDirective,
		TemplateLinkDirective,
		TemplateCacheDirective
	],
	exports: [
		TemplateDirective,
		TemplateLinkDirective,
		TemplateCacheDirective
	]
})
export class TemplateModule {
}
