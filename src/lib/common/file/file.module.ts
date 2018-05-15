import { NgModule } from '@angular/core';
import { FileUploadDirective } from './file-upload.directive';
@NgModule({
	declarations: [FileUploadDirective],
	exports: [FileUploadDirective]
})
export class FileModule {}
