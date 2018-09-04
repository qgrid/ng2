import { Directive, Input, OnInit, TemplateRef, Optional } from '@angular/core';
import { TemplateCacheService } from './template-cache.service';
import { TemplateHostService } from './template-host.service';
import { TemplateLink } from './template-link';

@Directive({
	selector: 'ng-template[for]'
})
export class TemplateCacheDirective implements OnInit {
	@Input('for') key = '';
	@Input() context = {};

	constructor(
		private templateCache: TemplateCacheService,
		private templateRef: TemplateRef<any>,
		@Optional() private templateHost: TemplateHostService) {
	}

	ngOnInit() {
		const link = new TemplateLink(this.templateRef, this.context);
		if (this.templateHost) {
			this.templateCache.put(this.templateHost.key(this.key), link);
		} else {
			this.templateCache.put(this.key, link);
		}
	}
}
