import { NgModule } from '@angular/core';
import { ThCoreDirective } from './th-core.directive';
import { HeadCoreComponent } from './head-core.component';
import { RowModule } from '../row/row.module';
import { CommonModule } from '@angular/common';
import { ResizeModule } from '../resize/resize.module';
import { DndModule } from '../dnd/dnd.module';

@NgModule({
	declarations: [
		HeadCoreComponent,
		ThCoreDirective
	],
	exports: [
		HeadCoreComponent,
		ThCoreDirective,
	],
	imports: [
		CommonModule,
		RowModule,
		ResizeModule,
		DndModule,
	]
})
export class HeadModule {
}
