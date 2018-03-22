import { NgModule } from '@angular/core';
import { VscrollService } from './vscroll.service';
import { VscrollColumnDirective } from './vscroll-column.directive';
import { VscrollRowDirective } from './vscroll-row.directive';
import { VscrollSettings } from './vscroll.settings';
import { VscrollContainer } from './vscroll.container';
import { VscrollPipe } from './vscroll.pipe';

@NgModule({
	declarations: [
		
	],
	exports: [
		VscrollSettings,
		VscrollContainer,
		VscrollService,
		VscrollColumnDirective,
		VscrollRowDirective,
		VscrollPipe
	],
	providers: [
		VscrollService
	]
})
export class VscrollModule {
}
