import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TemplateModule} from 'ng2-qgrid/template';
import {PersistenceComponent} from './persistence.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
	imports: [BrowserModule, TemplateModule, MatDialogModule],
	exports: [PersistenceComponent],
	declarations: [PersistenceComponent]
})
export class PersistenceModule {
}
