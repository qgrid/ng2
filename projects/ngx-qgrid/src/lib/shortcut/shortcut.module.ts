import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortcutService } from './shortcut.service';
import { ShortcutPipe } from './shortcut.pipe';
import { ShortcutHostDirective } from './shortcut-host.directive';

@NgModule({
	declarations: [
		ShortcutPipe,
		ShortcutHostDirective,
	],
	exports: [
		ShortcutHostDirective,
		ShortcutPipe
	],
	imports: [
		CommonModule,
	]
})
export class ShortcutModule { }
