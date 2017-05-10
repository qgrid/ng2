import Model from 'core/infrastructure/model';
import Grid from 'core/services/grid';
import Pipe from 'core/pipe/pipe';
import PipeUnit from 'core/pipe/units/pipe.unit';
import Command from 'core/infrastructure/command';
import {noop} from 'core/services/utility';
import {getFactory as valueFactory} from 'core/services/value';
import {getFactory as labelFactory} from 'core/services/label';
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
