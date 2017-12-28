import { NgModule } from '@angular/core';
import { RaiseModule } from './raise';
import { DndModule } from './dnd';
import { FocusModule } from './focus';
import { ResizeModule } from './resize';
import { LayoutModule } from './layout';
import { FileModule } from './file';

@NgModule({
	declarations: [],
	exports: [
		DndModule,
		FocusModule,
		ResizeModule,
		LayoutModule,
		RaiseModule,
		FileModule
	]
})
export class CommonModule {}
