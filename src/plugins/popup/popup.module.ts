import {NgModule} from '@angular/core';

import {TemplateModule} from 'ng2-qgrid/template';
import {PopupComponent} from 'ng2-qgrid/plugins/popup/popup.component';

@NgModule({
	imports: [TemplateModule],
	exports: [PopupComponent],
	declarations: [PopupComponent],
	providers: [],
})
export class PopupModule {
}
