import {Model} from '@grid/core/infrastructure';
import {Command} from '@grid/core/command';
import {GridService as Grid} from '@grid/core/services';
import {Pipe} from '@grid/core/pipe';
import {PipeUnit} from '@grid/core/pipe/units';
import {noop} from '@grid/core/utility';
import {getFactory as valueFactory} from '@grid/core/services/value';
import {getFactory as labelFactory} from '@grid/core/services/label';
import {Injectable} from "@angular/core";

@Injectable()
export class GridService {
  constructor() {
  }

  model() {
    return new Model();
  }

  service(model) {
    const apply = noop;
    return new Grid(model, apply);
  }

  get pipe() {
    return Pipe;
  }

  get pipeUnit() {
    return PipeUnit;
  }

  get Command() {
    return Command;
  }

  get valueFactory() {
    return valueFactory;
  }

  get labelFactory() {
    return labelFactory;
  }
}
