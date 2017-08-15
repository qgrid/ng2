import Component from '@grid/view/components/component';
import TemplateLink from '@grid/view/components/template/template.link';
import {Shortcut, ShortcutManager} from '@grid/core/shortcut';
import {PopupCommandManager} from './popup.command.manager';
import {Input, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import PopupService from '@grid/plugins/popup/popup.service';
import {TemplateCacheService, TemplateLinkService} from '@grid/template';
import {NgComponent} from '@grid/infrastructure/component';

@Component({
	selector: 'q-grid-popup-body',
	template: require('qgrid.plugin.popup-body.tpl.html')
})

class PopupBodyComponent extends NgComponent {
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
