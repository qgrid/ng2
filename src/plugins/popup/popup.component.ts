import {
	Component,
	Optional,
	Input,
	OnDestroy,
	OnInit,
	ViewContainerRef,
	ComponentFactory,
	ComponentFactoryResolver,
	ApplicationRef,
	Injector
} from '@angular/core';
import { RootService } from 'ng2-qgrid/infrastructure/component';
import { TemplateHostService } from 'ng2-qgrid/template';
import { PopupService } from './popup.service';
import { PluginComponent } from '../plugin.component';
import { PopupSettings } from './popup.settings';
import { Popup } from './popup';
import { PopupPanelComponent } from './popup-panel.component';
import { DomPortalHost } from '@angular/cdk/portal';
import { ComponentPortal } from '@angular/cdk/portal';
import { Portal } from '@angular/cdk/portal';

@Component({
	selector: 'q-grid-popup',
	templateUrl: './popup.component.html',
	providers: [TemplateHostService]
})
export class PopupComponent extends PluginComponent
	implements OnInit, OnDestroy {

	private portal: Portal<PopupPanelComponent>;
	private $implicit = this;

	@Input() public id: string;
	@Input() public context: any;

	constructor(
		@Optional() root: RootService,
		private popupService: PopupService,
		private templateHost: TemplateHostService,
		private viewContainerRef: ViewContainerRef
	) {
		super(root);
	}

	ngOnInit() {
		super.ngOnInit();

		this.templateHost.key = source => `${source}-popup-${this.id}.tpl.html`;
	}

	ngOnDestroy() {
		super.ngOnDestroy();

		this.close();
	}

	public open(settings: PopupSettings) {
		if (!this.isOpened()) {
			settings = Object.assign(new PopupSettings(), settings);

			const port = this.popupService.port(PopupPanelComponent, this.viewContainerRef);
			port(component => {
				const popup = new Popup(this.id, settings, component.element.nativeElement);
				component.popup = popup;
				return popup;
			});
		}
	}

	public close() {
		if (this.isOpened()) {
			this.popupService.close(this.id);
		}
	}

	public isOpened() {
		return this.popupService.isOpened(this.id);
	}
}
