import { Injectable } from '@angular/core';
import * as labelService from '@qgrid/core';
import * as valueService from '@qgrid/core';
import {
	Action,
	Command,
	GridService,
	identity,
	Node,
	noop,
	Pipe,
	PipeUnit,
	RowDetailsStatus,
} from '@qgrid/core';
import { GridModelBuilder } from '../grid/grid-model.builder';
import { GridModel } from './grid-model';

export { GridService } from '@qgrid/core';

@Injectable()
export class Grid {

	get noop() {
		return noop;
	}

	get identity() {
		return identity;
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

	get Action() {
		return Action;
	}

	get Node() {
		return Node;
	}

	get RowDetailsStatus() {
		return RowDetailsStatus;
	}

	get valueFactory() {
		return valueService.getValueFactory;
	}

	get labelFactory() {
		return labelService.getLabelFactory;
	}

	constructor(private modelBuilder: GridModelBuilder) {
	}

	model(): GridModel {
		return this.modelBuilder.build();
	}

	service(model: GridModel): GridService {
		return new GridService(model);
	}
}
