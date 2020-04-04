import { NgModule } from '@angular/core';
import { FileDirective } from './file.directive';

@NgModule({
	declarations: [FileDirective],
	exports: [FileDirective]
})
export class FileModule {}
