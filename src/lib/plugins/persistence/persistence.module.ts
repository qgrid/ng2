import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PersistenceComponent } from './persistence.component';
import { PersistencePanelComponent } from './persistence-panel.component';
import { TemplateModule } from '../../template/template.module';

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
