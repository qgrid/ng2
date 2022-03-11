import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCoreComponent } from './view-core.component';
import { CellHandlerModule } from '../cell-handler/cell-handler.module';
import { TableModule } from '../table/table.module';

@NgModule({
	declarations: [
		ViewCoreComponent
	],
	exports: [
		ViewCoreComponent
	],
	imports: [
		CommonModule,
		CellHandlerModule,
		TableModule,
	]
})
export class ViewModule {
}
