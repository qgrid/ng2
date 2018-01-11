import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TemplateModule } from 'ng2-qgrid/template';
import { PersistenceComponent } from './persistence.component';
import { PersistenceDialogComponent } from './persistence-dialog.component';
import { MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [BrowserModule, FormsModule, TemplateModule, MatDialogModule],
	exports: [PersistenceComponent],
	declarations: [PersistenceComponent, PersistenceDialogComponent],
	entryComponents: [PersistenceDialogComponent]
})
export class PersistenceModule {
}
