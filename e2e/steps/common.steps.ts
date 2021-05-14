import { Given, Then, When, Before, BeforeAll, After } from 'cucumber';
import { browser, element, by, promise, protractor, ExpectedConditions as until } from 'protractor';
import * as blueharvest from 'blue-harvest';
import * as path from 'path';

const chai = require('chai').use(require('chai-as-promised'));
const { expect } = chai;

const START_OPTIONS = { timeout: 30 * 1000 };

const GOLDEN_DIR = path.join(__dirname, '..', 'goldens/');
const DIFF_DIR = path.join(__dirname, '..', 'diff/');

let scenarioScreenshot = null;
let scenarioGoldenPath = '';

BeforeAll(clearDiff);

Before((scenario) => {
	scenarioGoldenPath = GOLDEN_DIR + scenario.pickle.name + '.png';
	console.log('\n' + scenario.pickle.name);
});

After(checkErrors);

Given('I am on {string}', START_OPTIONS, (p: string) => browser.get(p + '?env=test'));

Then('Grid is not empty', () => getRowCount().then(x => expect(x).to.be.above(0)));
Then('Grid is empty', () => getRowCount().then(x => expect(x).to.equal(0)));
Then('Row count equals to {int}', (count: number) => getRowCount().then(x => expect(x).to.equal(count)));
Then('Column count equals to {int}', (count: number) => getColumnCount().then(x => expect(x).to.equal(count)));

When('I click cell {string}[{int}]', (key, index) => getCell(key, index).click());

When('I click filter button [{int}]', (index: number) => clickFilterButton(index));
When('I click more button', () => clickMoreButton());
When('I select condition {string}', (cond: string) => selectCondition(cond));

When('I press ENTER button', () => browser.actions().sendKeys(protractor.Key.ENTER).perform());


When('I press ctrl+c', () => browser.actions().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'c')).perform());
When('I press ctrl+v on input', () => enterText(protractor.Key.chord(protractor.Key.CONTROL, 'v')));

When('I look at the Page', async () => {
	await browser.sleep(3000);
	scenarioScreenshot = await browser.takeScreenshot();
});

Then('Page looks the same as before', { timeout: 20 * 1000 }, async () => {
	const comparison = await blueharvest.compareScreenshot(scenarioScreenshot, scenarioGoldenPath, DIFF_DIR);
	expect(comparison)
		.to
		.satisfy(result => result.includes('The test passed. ') || result.includes('was successfully updated'));
});

When('I click {string} button', (text: string) => clickElement(text));
When('I enter {string} text', (text: string) => enterText(text));
When('I clear text', () => clearText());
When('I set {string} text', (text: string) => setText(text));
When('I click filter button for {string}', (text: string) => getFilterButton(text).click());
When('I select persistence item [{int}]', (num: number) => selectPersistenceItem(num));
When('I remove all values for selected column', () => removeAllChipValues());
When('I click Select all', () => getSelectAll());

async function checkErrors() {
	await browser
		.manage()
		.logs()
		.get('browser')
		.then(browserLog => {
			const str = '' + browserLog.length + ' errors';
			let errorLog = '\n';
			browserLog.map((item) => { errorLog += JSON.stringify(item.message) + '\n'; });
			expect(str).to.equal('0 errors', errorLog);
		});
}

function getRowCount() {
	return element(by.tagName('tbody'))
		.all(by.css('tr[q-grid-core-source=body]'))
		.count();
}

function getInput() {
	return element.all(by.className('mat-input-element')).get(1);
}

async function clearText() {
	const input = getInput();
	await browser.sleep(1000);
	await input.clear();
	await input.sendKeys(`a`, protractor.Key.BACK_SPACE);
}

async function setText(text: string) {
	const input = getInput();
	await browser.sleep(1000);
	await input.clear();
	await input.sendKeys(text);
}

async function enterText(text: string) {
	const input = getInput();
	await browser.sleep(1000);
	await input.clear();
	await input.sendKeys(text, protractor.Key.ENTER);
}

function clickElement(text: string) {
	return element(by.xpath('//*[contains(text(),\'' + text + '\')]')).click();
}

function stringToClassName(string: string) {
	return (string.charAt(0).toLowerCase() + string.slice(1)).replace(/\s/g, '');
}

function getCell(key, index) {
	const tr = element(by.tagName('tbody'))
		.all(by.css('tr[q-grid-core-source=body]'))
		.get(index);
	return tr.element(by.className(`q-grid-the-${stringToClassName(key)}`));
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

function getFilterButton(text) {
	// return element(by.xpath('//q-grid-column-filter-trigger[@ng-reflect-column=\'text: ' + text.replace(/\s/g, '') + '\']/button'));
	return element(by.xpath('//*[contains(text(),\' ' + text.replace(/\s/g, '') + ' \')]/../../q-grid-column-filter-trigger/button'));
}

function selectPersistenceItem(num) {
	return element(by.className('q-grid-persistence-list'))
		.all(by.className('q-grid-persistence-list-item'))
		.get(num)
		.all(by.tagName('button'))
		.get(0)
		.click();
}

function clearDiff() {
	const fs = require('fs');

	fs.readdir(DIFF_DIR, (err, files) => {
		if (err) { throw err; }

		for (const file of files) {
			fs.unlink(path.join(DIFF_DIR, file), ex => {
				if (ex) { throw ex; }
			});
		}
	});
}

async function removeAllChipValues() {
	const items = await element.all(by.css('.mat-chip'));
	for (const item of items) {
		await item.click();
		await browser.actions().sendKeys(protractor.Key.DELETE).perform();
	}
}

async function getSelectAll() {
	const el = await element(by.xpath(`//*[contains(text(),'Select All')]/..`));
	await browser.sleep(1000); // sleep is left here as the actions intercross without it and the scenario fails
	el.click();
}

function clickFilterButton(index) {
	const el = element.all(by.xpath('//*[contains(text(),\'filter_list\')]')).get(index);
	return el.click();
}

function clickMoreButton() {
	browser.executeScript('document.evaluate(\'//*[@id="mat-select-1"]/div/div[1]/span/mat-select-trigger/mat-icon\', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()\n');
}

function selectCondition(cond) {
	return element(by.xpath('//*[text() = \'' + cond + '\']')).click();
}

When('I scroll table till {string} column', async (name: string) => scrollTillColumnName(name));

async function scrollTillColumnName(columnName) {
	const SCROLL_JS_COLUMN_SCRIPT = 'arguments[0].scrollIntoView({block: "center", inline: "center"});';
	const SCROLL_JS_TABLE_SCRIPT = 'arguments[0].scrollLeft = arguments[1].scrollLeft;';
	const tableElement = await element(by.tagName('tbody'));
	const tableHeadRow = await element(by.tagName('thead'));
	const tableHeadElement = await element(by.xpath(`//th//label[contains(text(),'${columnName}')]`));
	browser.executeScript(SCROLL_JS_COLUMN_SCRIPT, tableHeadElement.getWebElement());
	browser.wait(protractor.ExpectedConditions.visibilityOf(tableHeadElement));
	browser.executeScript(SCROLL_JS_TABLE_SCRIPT, tableElement.getWebElement(), tableHeadRow.getWebElement());
}

When('I enter {string} and {string}', (date1: string, date2: string) => betweenDates(date1, date2));

function betweenDates(date1, date2) {
	const input1 = element.all(by.className('mat-input-element')).get(1);
	input1.clear();
	input1.sendKeys(date1, protractor.Key.ENTER);
	const input2 = element.all(by.className('mat-input-element')).get(2);
	input2.clear();
	input2.sendKeys(date2, protractor.Key.ENTER);
	for (let i = 0; i < 1000000; i++) { }
}
