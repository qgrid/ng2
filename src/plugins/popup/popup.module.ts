import { NgModule } from '@angular/core';
import { TemplateModule } from 'ng2-qgrid/template';
import { PopupComponent } from 'ng2-qgrid/plugins/popup/popup.component';
import { PopupPanelComponent } from 'ng2-qgrid/plugins/popup/popup-panel.component';
import { PopupService } from './popup.service';
import { PopupHeadComponent } from './popup-head.component';
import { PopupBodyComponent } from './popup-body.component';

@NgModule({
	imports: [TemplateModule],
	exports: [
		PopupComponent
	],
	declarations: [
		PopupComponent,
		PopupHeadComponent,
		PopupBodyComponent,
		PopupPanelComponent
	],
	providers: [
		PopupService
	],
	entryComponents: [
		PopupPanelComponent
	]
})
export class PopupModule {
}
