import { Injectable } from '@angular/core';
import { Action } from '@qgrid/core/action/action';
import { Command } from '@qgrid/core/command/command';
import { Pipe } from '@qgrid/core/pipe/pipe';
import { PipeUnit } from '@qgrid/core/pipe/pipe.unit';
import * as valueService from '@qgrid/core/services/value';
import * as labelService from '@qgrid/core/services/label';
import { RowDetailsStatus } from '@qgrid/core/row-details/row.details.status';
import { identity, noop } from '@qgrid/core/utility/kit';
import { GridModel } from './grid-model';
import { GridModelBuilder } from '../grid/grid-model.builder';
import { GridService } from '@qgrid/core/services/grid';
import { Node } from '@qgrid/core/node/node';

export { GridService } from '@qgrid/core/services/grid';

@Injectable()
export class Grid {
	constructor(private modelBuilder: GridModelBuilder) {
	}

	model() {
		return this.modelBuilder.build();
	}

	service(model: GridModel): GridService {
		return new GridService(model);
	}

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
		return valueService.getFactory;
	}

	get labelFactory() {
		return labelService.getFactory;
	}
}
