import TemplateLink from 'ng2-qgrid/view/components/template/template.link';
import {Shortcut, ShortcutManager} from 'ng2-qgrid/core/shortcut';
import {PopupCommandManager} from './popup.command.manager';
import {Component, Input, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {PopupService} from 'ng2-qgrid/plugins/popup/popup.service';
import {TemplateCacheService, TemplateLinkService} from 'ng2-qgrid/template';
import {NgComponent} from 'ng2-qgrid/infrastructure/component';

@Component({
	selector: 'q-grid-popup-body',
	template: '<div></div>'
})
export class PopupBodyComponent extends NgComponent {
	@Input() model;
	@Input() id;
	@Input() popup;

	private shortcutService;
	private shortcut;

	constructor(private qGridPopupService: PopupService,
					private viewContainerRef: ViewContainerRef,
					private templateLink: TemplateLinkService,
					private templateCache: TemplateCacheService) {
		super();

		this.shortcutService = new Shortcut(new ShortcutManager());
	}

	ngOnInit(): void {
		const commandManager = new PopupCommandManager(f => f(), this.qGridPopupService.get(this.id));
		this.shortcut = this.shortcutService.factory(commandManager);

		const model = this.model;
		const templateUrl = 'qgrid.plugin.popup-body.tpl.html';
		const template =
			this.templateCache.get(templateUrl) ||
			this.templateLink.get(templateUrl);

		this.viewContainerRef.createEmbeddedView(template, this);
		// 	const templateScope = this.$scope.$new();
		// 	const link = this.template.link(
		// 		templateUrl,
		// 		model.popup().resource,
		// 		[`${this.id}:body`]
		// 	);
		//
		// 	link(this.$element, templateScope);
		// 	this.$templateScope = templateScope;
		// }
	}

	close(): void {
		this.popup.close();
	}
}
