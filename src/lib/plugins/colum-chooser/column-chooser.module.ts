import { NgModule } from '@angular/core';
import { TemplateModule } from '../../template/template.module';
import { FormsModule } from '@angular/forms';
import { ColumnChooserComponent } from './column-chooser.component';
import { ColumnChooserListComponent } from './column-chooser-list.component';
import { ColumnChooserListService } from './colum-chooser-list.service';

@NgModule({
	imports: [FormsModule, TemplateModule],
	exports: [ColumnChooserComponent, ColumnChooserListComponent],
	declarations: [ColumnChooserComponent, ColumnChooserListComponent],
	providers: [ColumnChooserListService]
})
export class ColumnChooserModule {
}
