import { NgModule } from '@angular/core';
import { RaiseModule } from './raise/raise.module';
import { DndModule } from './dnd/dnd.module';
import { FocusModule } from './focus/focus.module';
import { ResizeModule } from './resize/resize.module';
import { LayoutModule } from './layout/layout.module';
import { FileModule } from './file/file.module';
import { VscrollModule } from './vscroll/vscroll.module';
import { InputModule } from './input/input.module';
import { TimeModule } from './time/time.module';
import { DateModule } from './date/date.module';

@NgModule({
	declarations: [],
	exports: [
		DndModule,
		FocusModule,
		ResizeModule,
		LayoutModule,
		InputModule,
		RaiseModule,
		FileModule,
		VscrollModule,
		TimeModule,
		DateModule
	]
})
export class CommonModule {}
