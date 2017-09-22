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
					private popupService: PopupService,
					private templateHost: TemplateHostService) {
		super(root);

		this.models = ['popup'];
	}

	ngOnInit() {
		super.ngOnInit();


		this.templateHost.key = `popup-${this.id}.tpl.html`;
	}

	public open(settings: IPopupSettings): void {
		settings.id = this.id;
		//settings.close = this.onCloseFunc();
		this.popupService.open(
			settings,
			this.model
		);
	}

	ngOnDestroy(): void {
		super.ngOnDestroy();
		if (this.ppupService.isOpened(this.id)) {
			this.popupService.close(this.id);
		}
	}
}
