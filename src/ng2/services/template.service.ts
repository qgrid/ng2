import {Component, NgModule, Injectable, Compiler} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

@Injectable()
export class TemplateService {
  constructor(private compiler: Compiler) {
  }

  componentFactory(template: string, context: any) {
    @Component({template: template})
    class TemplateComponent {
    }

    @NgModule({
      declarations: [TemplateComponent],
      imports: [BrowserModule]
    })
    class TemplateModule {
    }

    TemplateComponent.prototype = context;

    const module = this.compiler.compileModuleAndAllComponentsSync(TemplateModule);
    return module.componentFactories.find(comp => comp.componentType === TemplateComponent);
  };
}
