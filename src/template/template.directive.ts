import {
	Directive,
	DoCheck,
	EmbeddedViewRef,
	Input,
	ViewContainerRef
} from '@angular/core';
import { TemplateService } from './template.service';

@Directive({
	selector: 'ng-container[key]'
})
export class TemplateDirective implements DoCheck {
	@Input() key: any = '';
	@Input() context = null;
	private viewRef: EmbeddedViewRef<any>;

	constructor(
		private templateService: TemplateService,
		private viewContainerRef: ViewContainerRef
	) { }

	ngDoCheck() {
		if (!this.viewRef) {
			const link = this.templateService.find(this.key);
			if (link) {
				const createView = this.templateService.viewFactory(this.context);
				this.viewRef = createView(link, this.viewContainerRef);
			}
		}
	}
}
