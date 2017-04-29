import View from 'core/view/view';
import * as columnService from 'core/column/column.service';
import Aggregation from 'core/services/aggregation';
import AppError from 'core/infrastructure/error';
import Log from 'core/infrastructure/log';
import {getFactory as valueFactory} from 'core/services/value';

export default class FootView extends View {
	constructor(model, table) {
		super(model);

		this.table = table;
		this.rows = [];
		this.columns = [];

		this.valueFactory = valueFactory;

		model.viewChanged.watch(() => this.invalidate(model));
	}

	invalidate(model) {
		Log.info('view.foot', 'invalidate');

		const columns = model.view().columns;
		this.columns = columnService.lineView(columns).filter(c => c.model.pin === this.table.pin);
		this.rows = new Array(this.count);
	}

	get count() {
		const model = this.model;
		const columns = model.data().columns;
		const resourceCount = model.foot().resource.count;

		for (let i = 0, length = columns.length; i < length; i++) {
			if (columns[i].aggregation) {
				return Math.max(resourceCount, 1);
			}
		}

		return resourceCount;
	}

	value(column) {
		if (column.aggregation) {
			const aggregation = column.aggregation;
			const	aggregationOptions = column.aggregationOptions;
			
			if (!Aggregation.hasOwnProperty(aggregation)) {
				throw new AppError(
					'foot',
					`Aggregation ${aggregation} is not registered`);
			}

			const rows = this.model.data().rows;
			const getValue = this.valueFactory(column);

			return Aggregation[aggregation](rows, getValue, aggregationOptions);
		}
		return null;
	}
}