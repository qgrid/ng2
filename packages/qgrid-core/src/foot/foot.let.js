import { GridError } from '../infrastructure/error';
import { Log } from '../infrastructure/log';
import { Aggregation } from '../services/aggregation';
import { getValueFactory } from '../services/value';
import { hasOwnProperty } from '../utility/kit';

export class FootLet {

  get count() {
    const { model } = this.plugin;
    const { columns } = model.view();
    const resourceCount = model.foot().resource.count;

    for (let i = 0, length = columns.length; i < length; i++) {
      if (columns[i].aggregation) {
        return Math.max(resourceCount, 1);
      }
    }

    return resourceCount;
  }

  constructor(plugin) {
    const { model, observeReply } = plugin;

    this.plugin = plugin;
    this.valueFactory = getValueFactory;
    this.rows = [];

    observeReply(model.sceneChanged)
      .subscribe(e => {
        if (e.hasChanges('column')) {
          this.invalidate();
        }
      });
  }

  invalidate() {
    Log.info('view.foot', 'invalidate');

    this.rows = new Array(this.count);
  }

  columns(row, pin) {
    const { model } = this.plugin;
    return model.scene().column.area[pin] || [];
  }

  value(column) {
    if (column.aggregation) {
      const aggregation = column.aggregation;
      const aggregationOptions = column.aggregationOptions;

      if (!hasOwnProperty.call(Aggregation, aggregation)) {
        throw new GridError(
          'foot',
          `Aggregation ${aggregation} is not registered`);
      }

      const { model } = this.plugin;
      const { rows } = model.data();

      const getValue = this.valueFactory(column);
      return Aggregation[aggregation](rows, getValue, aggregationOptions);
    }

    return null;
  }
}
