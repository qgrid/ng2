const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

import { defineSupportCode } from 'cucumber';
import { browser, element, by, promise } from 'protractor';
import { oneMinuteTimeout } from './steps.helper';

defineSupportCode(({Given, When, Then, Before}) => {
	Given('I am on main page', oneMinuteTimeout, () => browser.get('/'));

	Given('I am on {string}', oneMinuteTimeout, (path: string) => browser.get(path));

	Then('Title is {string}', oneMinuteTimeout, (title: string) => {
		const expectedTitle = title.toLocaleLowerCase().trim();
		return element(by.css('.mat-card-title')).getText()
			.then(elementTitle => {
				const gotTitle = elementTitle.toLocaleLowerCase().trim();
				expect(gotTitle).to.equal(expectedTitle);
			});
	});

	Then('Grid has rows', oneMinuteTimeout, () => getRowCount()
		.then(num => expect(num).to.be.above(1)));

	Then('Grid has no rows', oneMinuteTimeout, () => getRowCount()
		.then(num => expect(num).to.equal(1)));

	Then('Number of rows equals to {int}', oneMinuteTimeout, (count: number) => getRowCount()
		.then(num => expect(num).to.equal(count + 1)));

	Then('Number of columns equals to {int}', oneMinuteTimeout, (count: number) => getColumnCount()
		.then(num => expect(num - 1).to.equal(count)));
	Then('Grid has columns', oneMinuteTimeout, () => getColumnCount()
		.then(num => expect(num).to.be.above(0)));

	Then('Grid has no columns', oneMinuteTimeout, () => browser.waitForAngularEnabled()
		.then(() => element(by.tagName('thead')).element(by.tagName('tr')).isPresent())
		.then(el => expect(el).to.be.false));

	Then('Cell at row {int} and column {int} has value {string}', oneMinuteTimeout,
		(row: number, col: number, value: string) => browser.waitForAngularEnabled()
			.then(() =>
				element(by.tagName('tbody'))
				.all(by.tagName('tr'))
				.get(row)
				.all(by.tagName('td'))
				.get(col - 1)
				.getText()
			)
			.then(text => expect(text).to.equal(value)));
});

function getRowCount(): promise.Promise<number> {
	return browser.waitForAngularEnabled()
		.then(() => element(by.tagName('tbody')).all(by.tagName('tr')).count());
}

function getColumnCount(): promise.Promise<number> {
	return browser.waitForAngularEnabled()
		.then(() => element(by.tagName('thead')).element(by.tagName('tr')).all(by.tagName('th')).count());
}


