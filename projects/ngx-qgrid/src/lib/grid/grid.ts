import { Injectable } from '@angular/core';
import { Action } from '@qgrid/core/action/action';
import { Command } from '@qgrid/core/command/command';
import { GridService } from '@qgrid/core/grid/grid.service';
import { Node } from '@qgrid/core/node/node';
import { Pipe } from '@qgrid/core/pipe/pipe';
import { PipeUnit } from '@qgrid/core/pipe/pipe.unit';
import { RowDetailsStatus } from '@qgrid/core/row-details/row.details.status';
import * as labelService from '@qgrid/core/services/label';
import * as valueService from '@qgrid/core/services/value';
import { identity, noop } from '@qgrid/core/utility/kit';
import { GridModelBuilder } from '../grid/grid-model.builder';
import { GridModel } from './grid-model';

export { GridService } from '@qgrid/core/grid/grid.service';

@Injectable()
export class Grid {
	constructor(private modelBuilder: GridModelBuilder) {
	}

	model(): GridModel {
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
		return valueService.getValueFactory;
	}

	get labelFactory() {
		return labelService.getLabelFactory;
	}
}
