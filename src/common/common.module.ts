import { NgModule } from '@angular/core';
import { RaiseModule } from './raise/raise.module';
import { DndModule } from './dnd/dnd.module';
import { FocusModule } from './focus/focus.module';
import { ResizeModule } from './resize/resize.module';
import { LayoutModule } from './layout/layout.module';
import { FileModule } from './file/file.module';

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
