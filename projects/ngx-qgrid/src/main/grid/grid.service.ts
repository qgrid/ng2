import { Injectable } from '@angular/core';
import { Action } from 'ng2-qgrid/core/action/action';
import { Command } from 'ng2-qgrid/core/command/command';
import { Pipe } from 'ng2-qgrid/core/pipe/pipe';
import { PipeUnit } from 'ng2-qgrid/core/pipe/pipe.unit';
import * as valueService from 'ng2-qgrid/core/services/value';
import * as labelService from 'ng2-qgrid/core/services/label';
import { RowDetailsStatus } from 'ng2-qgrid/core/row-details/row.details.status';
import { identity, noop } from 'ng2-qgrid/core/utility/kit';
import { GridModel } from 'ngx-qgrid/plugins/plugin.service';
import { ModelBuilderService } from '../model/model-builder.service';
import { GridService } from 'ng2-qgrid/core/services/grid';
import { Node } from 'ng2-qgrid/core/node/node';

export { GridService } from 'ng2-qgrid/core/services/grid';

@Injectable()
export class Grid {
	constructor(private modelBuilder: ModelBuilderService) {
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
