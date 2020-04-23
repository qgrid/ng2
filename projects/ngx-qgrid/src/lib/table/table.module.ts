import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCoreComponent } from './table-core.component';
import { HeadModule } from '../head/head.module';
import { FootModule } from '../foot/foot.module';
import { BodyModule } from '../body/body.module';
import { MarkupModule } from '../markup/markup.module';
import { DndModule } from '../dnd/dnd.module';
import { VscrollModule } from '../vscroll/vscroll.module';

@NgModule({
	declarations: [
		TableCoreComponent,
	],
	exports: [
		TableCoreComponent
	],
	imports: [
		CommonModule,

		HeadModule,
		FootModule,
		BodyModule,
		MarkupModule,
		DndModule,
		VscrollModule
	]
})
export class TableModule {
}
