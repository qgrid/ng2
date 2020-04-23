import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersistenceComponent } from './persistence.component';
import { PersistencePanelComponent } from './persistence-panel.component';
import { TemplateModule } from '@qgrid/ngx';

@NgModule({
	imports: [
		FormsModule,
		TemplateModule
	],
	exports: [
		PersistenceComponent,
		PersistencePanelComponent
	],
	declarations: [
		PersistenceComponent,
		PersistencePanelComponent
	],
	entryComponents: [
		PersistencePanelComponent
	]
})
export class PersistenceModule {
}
