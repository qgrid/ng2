import { Directive, Input, OnInit, TemplateRef } from '@angular/core';
import { TemplateLinkService } from './template-link.service';
import { TemplateLink } from './template-link';

@Directive({
	// tslint:disable-next-line
	selector: 'ng-template[key]'
})
export class TemplateLinkDirective implements OnInit {
	@Input() key = '';
	@Input() context = {};

	constructor(private templateLink: TemplateLinkService, private templateRef: TemplateRef<any>) {
	}

	ngOnInit() {
		const link = new TemplateLink(this.templateRef, this.context);
		this.templateLink.put(this.key, link);
	}
}
