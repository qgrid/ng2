import {
	Component,
	Optional,
	Input,
	OnDestroy,
	OnInit,
	ViewContainerRef,
	ComponentFactory,
	ComponentFactoryResolver
} from '@angular/core';
import { RootService } from 'ng2-qgrid/infrastructure/component';
import { TemplateHostService } from 'ng2-qgrid/template';
import { PopupService } from './popup.service';
import { PluginComponent } from '../plugin.component';
import { PopupSettings } from './popup.settings';
import { Popup } from './popup';
import { PopupPanelComponent } from './popup-panel.component';

@Component({
	selector: 'q-grid-popup',
	templateUrl: './popup.component.html',
	providers: [TemplateHostService, Popup]
})
export class PopupComponent extends PluginComponent
	implements OnInit, OnDestroy {
	private factory: ComponentFactory<PopupPanelComponent>;
	private $implicit = this;

	@Input() public id: string;

	constructor(
		@Optional() root: RootService,
		private popupService: PopupService,
		private templateHost: TemplateHostService,
		private resolver: ComponentFactoryResolver,
		private viewContainerRef: ViewContainerRef,
		private popup: Popup
	) {
		super(root);

		this.factory = resolver.resolveComponentFactory(PopupPanelComponent);
	}

	ngOnInit() {
		super.ngOnInit();

		this.popup.id = this.id;
		this.popup.model = this.model;
		this.templateHost.key = source => `${source}-popup-${this.id}.tpl.html`;
	}

	ngOnDestroy(): void {
		super.ngOnDestroy();

		if (this.popupService.isOpened(this.id)) {
			this.popupService.close(this.id);
		}
	}

	public open(settings: PopupSettings): void {
		settings = Object.assign(new PopupSettings(), settings);

		const component = this.viewContainerRef.createComponent(this.factory)
			.instance;

		component.popup = this.popup;
		this.popup.element = component.element.nativeElement;
		this.popup.settings = settings;

		this.popupService.open(this.popup);
	}

	public close() {
		this.popupService.close(this.id);
	}

	public isOpened() {
		return this.popupService.isOpened(this.id);
	}
}
