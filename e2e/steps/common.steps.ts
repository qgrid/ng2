import { Given, Then } from 'cucumber';
import { browser, element, by, promise } from 'protractor';

const chai = require('chai').use(require('chai-as-promised'));
const { expect } = chai;

const ALLOWED_LOG_LEVELS = ['INFO', 'CONFIG', 'FINE', 'FINER', 'FINEST'];
const START_OPTIONS = { timeout: 20 * 1000 };

Given('I am on {string}', START_OPTIONS, (path: string) => browser.get(path));
Then('Grid is not empty', () => getRowCount().then(x => expect(x).to.be.above(0)));
Then('Grid is empty', () => getRowCount().then(x => expect(x).to.equal(0)));
Then('Row count equals to {int}', (count: number) => getRowCount().then(x => expect(x).to.equal(count)));
Then('Column count equals to {int}', (count: number) => getColumnCount().then(x => expect(x).to.equal(count)));
Then('Browser console does not contains warning or error messages', () => verifyConsole());

function getRowCount() {
	return element(by.tagName('tbody'))
		.all(by.css('tr[q-grid-core-source=body]'))
		.count();
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

function verifyConsole() {

	// It does not work with Firefox https://github.com/SeleniumHQ/selenium/issues/4564
	return browser.manage().logs().get('browser').then(log => {
		const badMessage = log.filter(logMessage => ALLOWED_LOG_LEVELS.indexOf(logMessage.level.name_) < 0);
		expect(badMessage.length).to.equal(0);
	});
}
