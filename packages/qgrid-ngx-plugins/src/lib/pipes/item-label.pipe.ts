import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'qGridItemLabel',
})
export class ItemLabelPipe implements PipeTransform {
  transform(value: unknown, itemLabel: (x: unknown) => string) {
    if (itemLabel) {
      return itemLabel(value);
    }

    return value;
  }
}
