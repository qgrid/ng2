import {Injectable} from '@angular/core';
import {Model} from 'ng2-qgrid/core/infrastructure/model';
import {Command} from 'ng2-qgrid/core/command/command';
import {GridService as Grid} from 'ng2-qgrid/core/services/grid';
import {Pipe} from 'ng2-qgrid/core/pipe/pipe';
import {PipeUnit} from 'ng2-qgrid/core/pipe/pipe.unit';
import {noop} from 'ng2-qgrid/core/utility';
import {getFactory as valueFactory} from 'ng2-qgrid/core/services/value';
import {getFactory as labelFactory} from 'ng2-qgrid/core/services/label';

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
