import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateModule } from '@qgrid/ngx';
import { SerializationService } from './serialization.service';
import { EbNodeComponent } from './eb-node.component';
import { EbExpressionComponent } from './eb-expression.component';
import { EbClassDirective } from './eb-class.directive';
import { EbNodeService } from './eb-node.service';

@NgModule({
  imports: [
    CommonModule,
    TemplateModule,
  ],
  exports: [
    EbNodeComponent,
    EbClassDirective,
  ],
  declarations: [
    EbNodeComponent,
    EbExpressionComponent,
    EbClassDirective,
  ],
  providers: [
    SerializationService,
    EbNodeService,
  ],
})
export class EbModule {
}
