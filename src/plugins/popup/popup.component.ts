import {Component, Optional, Input, OnDestroy, OnInit} from '@angular/core';
import {PopupService, IPopupSettings} from 'ng2-qgrid/plugins/popup/popup.service';
import {PluginComponent} from '../plugin.component';
import {RootService} from 'ng2-qgrid/infrastructure/component';
import {TemplateHostService} from 'ng2-qgrid/template';

@Component({
	selector: 'q-grid-popup',
	templateUrl: './popup.component.html',
	providers: [TemplateHostService, PopupService]
})

export class PopupComponent extends PluginComponent implements OnInit, OnDestroy {
	@Input() id;

	constructor(@Optional() root: RootService,
					private qGridPopupService: PopupService,
					private templateHost: TemplateHostService) {
		super(root);

		this.models = ['popup'];
	}

	ngOnInit() {
		super.ngOnInit();
	}

	private doSmthInShowFunc() {
		// this.$transclude((clone, scope) => {
		//   template = clone;
		//   templateScope = scope;
		//
		//   this.$element.append(clone);
		// });
		//
		// template.remove();
		// templateScope.$destroy();
		//
		// super.show();
		return null;
	}

	public show(): void {
		let template = null;
		let templateScope = null;

		this.doSmthInShowFunc();
	}

	private scope() {
		// this.$scope
		return null;
	}

	private onCloseFunc() {
		// this.onClose
		return null;
	}

	public open(settings: IPopupSettings): void {
		settings.id = this.id;
		settings.close = this.onCloseFunc();
		this.qGridPopupService.open(
			settings,
			this.model,
			this.scope
		);
	}

	get resource(): any {
		return this.model.popup().resource;
	}

	ngOnDestroy(): void {
		super.ngOnDestroy();
		if (this.qGridPopupService.isOpened(this.id)) {
			this.qGridPopupService.close(this.id);
		}
	}
}
