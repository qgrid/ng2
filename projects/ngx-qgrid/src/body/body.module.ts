import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyCoreComponent } from './body-core.component';
import { TdCoreAlignDirective } from './td-core-align.directive';
import { TdCoreDirective } from './td-core.directive';
import { VscrollModule } from '../vscroll/vscroll.module';
import { RowModule } from '../row/row.module';

@NgModule({
	declarations: [
		BodyCoreComponent,
		TdCoreAlignDirective,
		TdCoreDirective,
	],
	imports: [
		CommonModule,
		VscrollModule,
		RowModule,
	],
	exports: [
		BodyCoreComponent,
	]
})
export class BodyModule {
}
