import { NgModule } from '@angular/core';
import { VscrollService } from './vscroll.service';
import { VscrollColumnDirective } from './vscroll-column.directive';
import { VscrollRowDirective } from './vscroll-row.directive';
import { VscrollSettings } from './vscroll.settings';
import { VscrollContainer } from './vscroll.container';
import { VscrollPipe } from './vscroll.pipe';
import { VscrollMarkDirective } from './vscroll-mark.directive';
import { VscrollPortXDirective } from './vscroll-port-x.directive';
import { VscrollPortYDirective } from './vscroll-port-y.directive';
import { VscrollDirective } from './vscroll.directive';

@NgModule({
	declarations: [
		VscrollDirective,
		VscrollColumnDirective,
		VscrollRowDirective,
		VscrollMarkDirective,
		VscrollPortXDirective,
		VscrollPortYDirective,
		VscrollPipe
	],
	exports: [
		VscrollDirective,
		VscrollColumnDirective,
		VscrollRowDirective,
		VscrollMarkDirective,
		VscrollPortXDirective,
		VscrollPortYDirective,
		VscrollPipe
	],
	providers: [
		VscrollService
	]
})
export class VscrollModule {
}
