import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RestComponent } from './rest.component';

@NgModule({
	imports: [HttpClientModule],
	declarations: [RestComponent],
	exports: [RestComponent]
})
export class RestModule {
}
