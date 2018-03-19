import { View } from '../view';
import { getFactory as valueFactory } from '../services/value';
import { getFactory as labelFactory, set as setLabel } from '../services/label';
import { Log } from '../infrastructure';
import { Renderer } from '../scene/render';

export class BodyView extends View {
	constructor(model, table) {
		super(model);

		this.table = table;
		this.rows = [];
		this.render = new Renderer(model);
		this.valueCache = new Map();
		this.labelCache = new Map();
		this.valueFactory = valueFactory;
		this.labelFactory = labelFactory;

		this.invalidate();

		let wasInvalidated = false;
		this.using(model.sceneChanged.watch(e => {
			if (e.hasChanges('rows')) {
				this.invalidate();
				wasInvalidated = true;
			}
		}));

		if (!wasInvalidated) {
			this.invalidate();
		}
	}

    get lastRow() {
        let lastRowIndex = this.rows.length - 1;

        if(lastRowIndex < 0) {
            return null;
        }
        return this.rows[lastRowIndex]
    }

	invalidate() {
		Log.info('view.body', 'invalidate');

		const model = this.model;
		const table = this.table;
		const sceneState = model.scene();

		this.rows = sceneState.rows;
		this.valueCache = new Map();
		this.labelCache = new Map();

		table.view.removeLayer('blank');
		if (!this.rows.length && !model.data().rows.length) {
			table.view.addLayer('blank');
		}
	}

	columns(row, pin) {
		return this.render.columns(row, pin);
	}

	value(row, column, value) {
		if (arguments.length === 3) {
			this.render.setValue(row, column, value);
			return;
		}

		const key = column.key;
		let getValue = this.valueCache.get(key);
		if (!getValue) {
			getValue = valueFactory(column);
			this.valueCache.set(key, getValue);
		}

		return this.render.getValue(row, column, getValue);
	}

	label(row, column, value) {
		if (arguments.length === 3) {
			setLabel(row, column, value);
			return;
		}

		const key = column.key;
		let getLabel = this.labelCache.get(key);
		if (!getLabel) {
			getLabel = labelFactory(column);
			this.labelCache.set(key, getLabel);
		}

		return this.render.getValue(row, column, getLabel);
	}
}