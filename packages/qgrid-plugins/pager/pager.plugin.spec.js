import { PagerView } from './pager.view';
import { modelFactory } from '@qgrid/core/test/model.factory';

describe('Pager plugin', () => {
	describe('next command', () => {
		it('should allow to go to the next page in case of the first page', () => {
			const model = modelFactory();
			const view = new PagerView(model, null, { add: x => x });

			model.pagination({
				current: 0,
				size: 50,
				count: 100
			});

			expect(view.next.canExecute()).to.be.equal(true);
		});

		it('should allow to go to the next page in case of the middle page', () => {
			const model = modelFactory();
			const view = new PagerView(model, null, { add: x => x });

			model.pagination({
				current: 1,
				size: 50,
				count: 150
			});

			expect(view.next.canExecute()).to.be.equal(true);
		});

		it('should not allow to go to the next page in case of the last page', () => {
			const model = modelFactory();
			const view = new PagerView(model, null, { add: x => x });

			model.pagination({
				current: 2,
				size: 50,
				count: 150
			});

			expect(view.next.canExecute()).to.be.equal(false);
		});

		it('should move to the next page', () => {
			const model = modelFactory();
			const view = new PagerView(model, null, { add: x => x });

			model.pagination({
				current: 0,
				size: 50,
				count: 100
			});

			view.next.execute();

			expect(model.pagination().current).to.be.equal(1);
		});
	});

	describe('prev command', () => {
		it('should not allow to go to previous page in case of the first page', () => {
			const model = modelFactory();
			const view = new PagerView(model, null, { add: x => x });

			model.pagination({
				current: 0,
				size: 50,
				count: 100
			});

			expect(view.prev.canExecute()).to.be.equal(false);
		});

		it('should allow to go to previous page in case of the middle page', () => {
			const model = modelFactory();
			const view = new PagerView(model, null, { add: x => x });

			model.pagination({
				current: 1,
				size: 50,
				count: 150
			});

			expect(view.prev.canExecute()).to.be.equal(true);
		});

		it('should allow to go to previous page in case of the last page', () => {
			const model = modelFactory();
			const view = new PagerView(model, null, { add: x => x });

			model.pagination({
				current: 2,
				size: 50,
				count: 150
			});

			expect(view.prev.canExecute()).to.be.equal(true);
		});

		it('should move to previous page', () => {
			const model = modelFactory();
			const view = new PagerView(model, null, { add: x => x });

			model.pagination({
				current: 1,
				size: 50,
				count: 100
			});

			view.prev.execute();

			expect(model.pagination().current).to.be.equal(0);
		});
	});

	describe('size', () => {
		it('should return current page size', () => {
			const model = modelFactory();
			const view = new PagerView(model, null, { add: x => x });

			model.pagination({
				current: 2,
				size: 50
			});

			expect(view.size).to.be.equal(50);
		});

		it('should set current page size', () => {
			const model = modelFactory();
			const view = new PagerView(model, null, { add: x => x });

			model.pagination({
				current: 2,
				size: 50
			});

			view.size = 30;

			expect(model.pagination().size).to.be.equal(30);
		});

		it('should reset current page when size is changed', () => {
			const model = modelFactory();
			const view = new PagerView(model, null, { add: x => x });

			model.pagination({
				current: 2,
				size: 50,
				count: 100
			});

			view.size = 30;
			expect(model.pagination().current).to.be.equal(0);
		});
	});

	describe('total', () => {
		it('should return count', () => {
			const model = modelFactory();
			const view = new PagerView(model, null, { add: x => x });

			model.pagination({
				count: 100
			});

			expect(view.total).to.be.equal(100);
		});
	});

	describe('from', () => {
		it('should return a number of the first page row', () => {
			const model = modelFactory();
			const view = new PagerView(model, null, { add: x => x });

			model.pagination({
				count: 100,
				size: 30,
				current: 2
			});

			expect(view.from).to.be.equal(61);
		});

		it('should not exceed a total number of rows', () => {
			const model = modelFactory();
			const view = new PagerView(model, null, { add: x => x });

			model.pagination({
				count: 0,
				size: 30,
				current: 1
			});

			expect(view.from).to.be.equal(0);
		});
	});

	describe('to', () => {
		it('should return a number of the last page row', () => {
			const model = modelFactory();
			const view = new PagerView(model, null, { add: x => x });

			model.pagination({
				count: 100,
				size: 30,
				current: 2
			});

			expect(view.to).to.be.equal(90);
		});

		it('should return a number of the last row in case when the last page is smaller', () => {
			const model = modelFactory();
			const view = new PagerView(model, null, { add: x => x });

			model.pagination({
				count: 100,
				size: 30,
				current: 3
			});

			expect(view.to).to.be.equal(100);
		});
	});

	describe('totalPages', () => {
		it('should return integer number of pages', () => {
			const model = modelFactory();
			const view = new PagerView(model, null, { add: x => x });

			model.pagination({
				count: 100,
				size: 30
			});

			expect(view.totalPages).to.be.equal(4);
		});

		it('should return 0 when size is set to 0', () => {
			const model = modelFactory();
			const view = new PagerView(model, null, { add: x => x });

			model.pagination({
				count: 0,
				size: 0
			});

			expect(view.totalPages).to.be.equal(0);
		});
	});
});
