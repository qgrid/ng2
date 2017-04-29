import defaultUnit from './default.pipe.unit';
import viewUnit from './view.pipe.unit';
import columnUnit from './column.pipe.unit';

export default class PipeUnit {
	static get default(){
		return defaultUnit;
	}

	static get view(){
		return viewUnit;
	}

	static get column() {
		return columnUnit;
	}
}