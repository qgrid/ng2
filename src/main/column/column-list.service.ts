import {Injectable} from "@angular/core";
import {compile} from '@grid/core/services'
import {isUndefined, clone, isObject, identity} from '@grid/core/services/utility';
import {parseFactory, getType} from '@grid/core/services';
import {RootService} from "@grid/infrastructure/component";

@Injectable()
export class ColumnListService {
  constructor(private root: RootService) {
  }

  copy(target, source) {
    Object.keys(source)
      .filter(key => !isUndefined(source[key]) && key !== 'value')
      .forEach(key => {
        const value = source[key];
        const accessor = compile(key);
        const targetValue = accessor(target);
        const parse = parseFactory(getType(targetValue));
        const sourceValue = parse(value)
        accessor(target, sourceValue);
      });
  }

  add(column) {
    const columnList = this.root.model.columnList;
    columnList({
      columns: columnList().columns.concat([column])
    });
  }

  register(column) {
    const columnList = this.root.model.columnList;
    const reference = clone(columnList().columns);
    reference[column.type] = column;
    columnList({reference: reference});
  }
}
