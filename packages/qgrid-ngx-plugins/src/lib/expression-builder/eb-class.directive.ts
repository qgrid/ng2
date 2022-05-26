import {
  Directive,
  DoCheck,
  ElementRef,
  Input,
  OnInit,
  Optional,
} from '@angular/core';
import { isArray } from '@qgrid/core';
import { Evaluate, evaluateFactory } from './digest/evaluate';
import { EbNodeComponent } from './eb-node.component';
import { Expression } from './model/expression';

type EbClassType = string | string[] | { [key: string]: boolean | ((...args: unknown[]) => boolean) };

@Directive({
  selector: '[q-grid-eb-class]',
})
export class EbClassDirective implements OnInit, DoCheck {
  private evaluate: Evaluate;
  private oldClassList: string[] = [];

  @Input('q-grid-eb-class') class: EbClassType;
  @Input('q-grid-eb-class-model') model: Expression;

  constructor(
    private elementRef: ElementRef,
    @Optional() private node: EbNodeComponent,
  ) { }

  ngOnInit() {
    this.evaluate = evaluateFactory(this.model, [this.node ? this.node.model : null]);
  }

  ngDoCheck() {
    const result = this.evaluate<EbClassType>(this.class);
    if (result) {
      const classList = this.fetchClasses(result);
      if (this.oldClassList.length !== classList.length
        || this.oldClassList.join(' ') !== classList.join(' ')) {

        const element = this.elementRef.nativeElement as HTMLElement;
        element.classList.remove(...this.oldClassList);
        element.classList.add(...classList);
        this.oldClassList = classList;
      }
    } else if (this.oldClassList.length) {
      const element = this.elementRef.nativeElement as HTMLElement;
      element.classList.remove(...this.oldClassList);
      this.oldClassList = [];
    }
  }

  private fetchClasses(meta: EbClassType): string[] {
    if (isArray(meta)) {
      return meta as string[];
    }

    const keys = Object.keys(meta);
    const classList = [];
    for (let i = 0, length = keys.length; i < length; i++) {
      const key = keys[i];
      if (meta[key]) {
        classList.push(key);
      }
    }

    return classList;
  }
}
