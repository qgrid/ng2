import { Given, Then, When } from 'cucumber';
import { browser, element, by, promise } from 'protractor';

const chai = require('chai').use(require('chai-as-promised'));
const { expect } = chai;

const START_OPTIONS = { timeout: 20 * 1000 };

Given('I am on {string}', START_OPTIONS, (path: string) => browser.get(path));
Then('Grid is not empty', () => getRowCount().then(x => expect(x).to.be.above(0)));
Then('Grid is empty', () => getRowCount().then(x => expect(x).to.equal(0)));
Then('Row count equals to {int}', (count: number) => getRowCount().then(x => expect(x).to.equal(count)));
Then('Column count equals to {int}', (count: number) => getColumnCount().then(x => expect(x).to.equal(count)));
When('I click cell {string}[{int}]', (key, index) => getCell(key, index).click());

function getRowCount() {
	return element(by.tagName('tbody'))
		.all(by.css('tr[q-grid-core-source=body]'))
		.count();
}

function getCell(key, index) {
	const tr = element(by.tagName('tbody'))
		.all(by.css('tr[q-grid-core-source=body]'))
		.get(index);
	return tr.element(by.css(`.q-grid-the-${key}`));
}

function getColumnCount() {
	return element(by.tagName('thead'))
		.element(by.tagName('tr'))
		.all(by.tagName('th'))
		.count()
		.then(x =>
			// Minus pad column
			new promise.Promise(resolve => resolve(x - 1))
		);
}
