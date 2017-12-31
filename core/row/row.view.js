import {View} from '../view';
import {Log} from '../infrastructure';
import {Command} from '../command';
import * as columnService from '../column/column.service';
import {FilterRowColumn} from '../column-type';
import {clone, isUndefined} from '../utility';

export class RowView extends View {
	constructor(model, table, tagName) {
		super(model);

		this.table = table;
		this.tagName = tagName;

		this.drop = new Command({
			source: 'row.view',
			execute: e => {
                const source = e.source;
                const target = e.target;
			}
		});

		this.drag = new Command({
			source: 'row.view',			
		});
	}

	transfer(row) {
		return {
			key: this.tagName,
			value: row
		};
	}
}