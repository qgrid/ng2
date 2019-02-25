import { Given, Then, When, Before, BeforeAll } from 'cucumber';
import { browser, element, by, promise, protractor } from 'protractor';
import * as blueharvest from 'blue-harvest';
import * as path from 'path';

const chai = require('chai').use(require('chai-as-promised'));
const { expect } = chai;

const START_OPTIONS = { timeout: 30 * 1000 };

let currentScreenshot = null;
let goldenPath = '';
const goldenDir = path.join(__dirname, '..', 'goldens/');
const diffDir = path.join(__dirname, '..', 'diff/');

BeforeAll(() => clearDiff());
Before((scenario) => goldenPath = goldenDir + scenario.pickle.name + '.png');
Given('I am on {string}', START_OPTIONS, (path: string) => browser.get(path));
Then('Grid is not empty', () => getRowCount().then(x => expect(x).to.be.above(0)));
Then('Grid is empty', () => getRowCount().then(x => expect(x).to.equal(0)));
Then('Row count equals to {int}', (count: number) => getRowCount().then(x => expect(x).to.equal(count)));
Then('Column count equals to {int}', (count: number) => getColumnCount().then(x => expect(x).to.equal(count)));
When('I click cell {string}[{int}]', (key, index) => getCell(key, index).click());
When('I look at the Page', { timeout: 20 * 1000 }, async () => { 
	await browser.sleep(3000);
	currentScreenshot = await browser.takeScreenshot();
});
Then('Page looks the same as before', async () => await expect(await blueharvest.compareScreenshot(currentScreenshot, goldenPath, diffDir))
														.to
														.satisfy(result => result.includes('The test passed. ') || result.includes('was successfully updated')));
When('I click {string} button', (element:string) => clickElement(element));
When('I enter {string} text', (text: string) => enterText(text));

function getRowCount() {
	return element(by.tagName('tbody'))
		.all(by.css('tr[q-grid-core-source=body]'))
		.count();
}

function getEditor() {
	return element(by.css('.q-grid-editor-content'));
}

function getInput() {
	const editor = getEditor();
	return editor.element(by.css('.mat-input-element'));
}

async function enterText(text:string) {
	const input = getInput();
	await input.clear();
	await input.sendKeys(text, protractor.Key.ENTER);
}

function clickElement(text:string) {
	return element(by.xpath("//*[contains(text(),'" + text + "')]")).click();
}

function stringToClassName(string: string) {
	return (string.charAt(0).toLowerCase() + string.slice(1)).replace(/\s/g, '')
}

function getCell(key, index) {
	const tr = element(by.tagName('tbody'))
		.all(by.css('tr[q-grid-core-source=body]'))
		.get(index);
	return tr.element(by.css(`.q-grid-the-${stringToClassName(key)}`));
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

function clearDiff() {

	let fs = require('fs');
	let path = require('path');

	fs.readdir(diffDir, (err, files) => {
		if (err) throw err;

		for (const file of files) {
		  fs.unlink(path.join(diffDir, file), err => {
			if (err) throw err;
		  });
		}
	  });
}