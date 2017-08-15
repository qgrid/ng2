import {NgModule} from '@angular/core';

import {TemplateModule} from '@grid/template';
import {PopupComponent} from '@grid/plugins/popup/popup.component';

@NgModule({
	imports: [TemplateModule],
	exports: [PopupComponent],
	declarations: [PopupComponent],
	providers: [],
})
export class PopupModule {
}
