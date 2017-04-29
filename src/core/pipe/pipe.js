import filter from './filter.pipe';
import pagination from './pagination.pipe';
import sort from './sort.pipe';
import data from './data.pipe';
import memo from './memo.pipe';
import group from './group.pipe';
import pivot from './pivot.pipe';
import column from './column.pipe';
import view from './view.pipe';

export default class Pipe {
	static get data() {
		return data;
	}

	static get filter() {
		return filter;
	}

	static get pagination() {
		return pagination;
	}

	static get sort() {
		return sort;
	}

	static get memo(){
		return memo;
	}

	static get group() {
		return group;
	}

	static get pivot() {
		return pivot;
	}

	static get column(){
		return column;
	}

	static get view(){
		return view;
	}
}