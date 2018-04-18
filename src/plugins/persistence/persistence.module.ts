import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TemplateModule } from 'ng2-qgrid/template/template.module';
import { PersistenceComponent } from './persistence.component';
import { PersistencePanelComponent } from './persistence-panel.component';
import { MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		TemplateModule,
		MatDialogModule
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
