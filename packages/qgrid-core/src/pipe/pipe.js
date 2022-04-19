import { animationPipe } from './animation.pipe';
import { columnIndexPipe } from './column.index.pipe';
import { columnPipe } from './column.pipe';
import { dataPipe } from './data.pipe';
import { filterPipe } from './filter.pipe';
import { groupPipe } from './group.pipe';
import { memoPipe } from './memo.pipe';
import { paginationPipe } from './pagination.pipe';
import { pivotPipe } from './pivot.pipe';
import { scenePipe } from './scene.pipe';
import { sortPipe } from './sort.pipe';
import { viewPipe } from './view.pipe';

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