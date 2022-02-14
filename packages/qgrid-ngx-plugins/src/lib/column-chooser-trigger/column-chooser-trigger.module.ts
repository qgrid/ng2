import { NgModule } from '@angular/core';
import { ColumnChooserTriggerComponent } from './column-chooser-trigger.component';
import { TemplateModule } from '@qgrid/ngx';

@NgModule({
	imports: [TemplateModule],
	exports: [ColumnChooserTriggerComponent],
	declarations: [ColumnChooserTriggerComponent]
})
export class ColumnChooserTriggerModule {}
