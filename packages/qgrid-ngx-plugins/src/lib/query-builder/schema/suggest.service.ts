import { Line } from '../../expression-builder/model/line';
import { Node } from '../../expression-builder/model/node';
import { QueryBuilderService } from '../query-builder.service';

export function suggestFactory(service: QueryBuilderService, name: string) {
  return function (this: { value: string }, node: Node, line: Line) {
    const search = (this.value || '').toLowerCase();
    const field = line.get(name).expressions[0].value;
    return service.suggest(field, 0, 10, search);
  };
}

export function suggestsFactory(service: QueryBuilderService, name: string) {
  return function (this: { search: string; values: string[] }, node: Node, line: Line) {
    const search = this.search;
    const field = line.get(name).expressions[0].value;
    const selection: string[] =
      (this.values || [])
        .map(item => ('' + item).toLowerCase());

    return new Promise<string[]>((resolve, reject) =>
      service
        .suggest(field, 0, 10, search, selection)
        .then(items => {
          const result = selection.length
            ? items.filter(item => selection.indexOf(('' + item).toLowerCase()) < 0)
            : items;
          resolve(result);
        })
        .catch(ex => reject(ex)),
    );
  };
}
