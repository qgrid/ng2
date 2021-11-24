import { dataPipe } from './data.pipe';
import { filterPipe } from './filter.pipe';
import { paginationPipe } from './pagination.pipe';
import { sortPipe } from './sort.pipe';
import { memoPipe } from './memo.pipe';
import { groupPipe } from './group.pipe';
import { pivotPipe } from './pivot.pipe';
import { columnPipe } from './column.pipe';
import { columnIndexPipe } from './column.index.pipe'
import { animationPipe } from './animation.pipe';
import { viewPipe } from './view.pipe';
import { scenePipe } from './scene.pipe';

export class Pipe {
	static get data() {
		return dataPipe;
	}

	static get filter() {
		return filterPipe;
	}

	static get pagination() {
		return paginationPipe;
	}

	static get sort() {
		return sortPipe;
	}

	static get memo() {
		return memoPipe;
	}

	static get group() {
		return groupPipe;
	}

	static get pivot() {
		return pivotPipe;
	}

	static get column() {
		return columnPipe;
	}

	static get columnIndex() {
		return columnIndexPipe;
	}

	static get animation() {
		return animationPipe;
	}

	static get view() {
		return viewPipe;
	}

	static get scene() {
		return scenePipe;
	}
}