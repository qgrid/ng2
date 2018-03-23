import { NgModule } from '@angular/core';
import { TemplateModule } from 'ng2-qgrid/template/template.module';
import { PopupComponent } from './popup.component';
import { PopupPanelComponent } from './popup-panel.component';
import { PopupService } from './popup.service';
import { PopupHeadDirective } from './popup-head.directive';

@NgModule({
	imports: [TemplateModule],
	exports: [
		PopupComponent,
		PopupHeadDirective
	],
	declarations: [
		PopupComponent,
		PopupPanelComponent,
		PopupHeadDirective
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
