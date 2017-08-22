import {Component, Input, ElementRef, OnInit, OnDestroy, ViewContainerRef} from '@angular/core';
import {POPUP_NAME} from '../definition';
import PopupService, {IPopupSettings, PopupSettings} from 'ng2-qgrid/plugins/popup/popup.service';
import {TemplateCacheService, TemplateLinkService} from 'ng2-qgrid/template';

@Component({
	selector: 'q-grid-popup-trigger',
	template: require('qgrid.plugin.popup-trigger.tpl.html')
})
export class PopupTriggerComponent implements OnInit {
	@Input() popup;

	constructor(private qGridPopupService: PopupService,
					private element: ElementRef,
					private viewContainerRef: ViewContainerRef,
					private templateLink: TemplateLinkService,
					private templateCache: TemplateCacheService) {
	}

	ngOnInit(): void {
		const model = this.popup.model;
		const templateUrl = 'qgrid.plugin.popup-trigger.tpl.html';
		const template =
			this.templateCache.get(templateUrl) ||
			this.templateLink.get(templateUrl);

		this.viewContainerRef.createEmbeddedView(template, this);
		// const templateScope = this.$scope.$new();
		// const link = this.template.link(
		// 	templateUrl,
		// 	model.popup().resource,
		// 	[`${this.popup.id}:trigger`]
		// );
		//
		// link(this.$element, templateScope);
		// this.$templateScope = templateScope;
	}

	open(settings: IPopupSettings = PopupSettings): void {
		if (!settings.target) {
			settings.target = this.element.nativeElement[0];
		}

		this.popup.open(settings);
	}
}
