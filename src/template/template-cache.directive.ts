import {Directive, Input, OnInit, TemplateRef, Optional} from '@angular/core';
import {TemplateCacheService} from './template-cache.service';
import {TemplateHostService} from 'ng2-qgrid/template/template-host.service';

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
			this.templateCache.put(this.templateHost.key(this.key), this.templateRef);
		} else {
			this.templateCache.put(this.key, this.templateRef);
		}
	}
}
