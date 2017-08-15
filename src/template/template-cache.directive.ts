import {Directive, Input, OnInit, TemplateRef, Optional} from '@angular/core';
import {TemplateCacheService} from './template-cache.service';
import {TemplateHostService} from '@grid/template/template-host.service';

@Directive({
	selector: 'ng-template[for]'
})
export class TemplateCacheDirective implements OnInit {
	@Input('for') key = '';

	constructor(private templateCache: TemplateCacheService,
					private templateRef: TemplateRef<any>,
					@Optional() private templateHost: TemplateHostService) {
	}

	ngOnInit() {
		if (this.templateHost) {
			this.templateCache.put(`${this.key}-${this.templateHost.key}`, this.templateRef);
		} else {
			this.templateCache.put(this.key, this.templateRef);
		}
	}
}
