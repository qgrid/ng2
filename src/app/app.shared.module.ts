import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		TranslateModule
	],
	exports: [
		CommonModule,
		TranslateModule
	]
})
export class SharedModule {
	public static Language = 'ru';
	public static translate: TranslateService;
	
	static forRoot(): ModuleWithProviders<any> {
		return {
			ngModule: SharedModule
		};
	}
}
