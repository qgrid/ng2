import { BasicRow } from './basic.row';
import { set as setValue } from '../../services/value';
import { set as setLabel } from '../../services/label';

export class DataRow extends BasicRow {
	constructor(model) {
		super(model);

		this.setValue = setValue;
		this.setLabel = setLabel;
	}
}