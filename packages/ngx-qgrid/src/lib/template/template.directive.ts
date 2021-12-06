import {
	Directive,
	DoCheck,
	EmbeddedViewRef,
	Input,
	ViewContainerRef,
	SimpleChanges,
	OnChanges
} from '@angular/core';
import { TemplateService } from './template.service';

@Directive({
	// tslint:disable-next-line
	selector: 'ng-container[key]'
})
export class TemplateDirective implements DoCheck, OnChanges {
	private viewRef: EmbeddedViewRef<any>;

	@Input() key = '';
	@Input() context: any = null;
	@Input() check = false;

	constructor(
		private templateService: TemplateService,
		private viewContainerRef: ViewContainerRef
	) { }

	ngOnChanges(changes: SimpleChanges) {
		const keyChange = changes['key'];
		if (keyChange) {
			if (this.viewRef) {
				this.viewRef.destroy();
				this.viewRef = null;
			}
		}
	}

	ngDoCheck() {
		if (!this.viewRef) {
			const link = this.templateService.find(this.key);
			if (link) {
				this.viewRef = this.viewContainerRef.createEmbeddedView(link.template, this.context);
			}
		}
	}
}
