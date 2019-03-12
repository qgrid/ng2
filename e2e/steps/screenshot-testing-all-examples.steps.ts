import { Then, When, After } from 'cucumber';
import { browser, element, by } from 'protractor';
import * as blueharvest from 'blue-harvest';
import * as path from 'path';

const chai = require('chai').use(require('chai-as-promised'));
const { expect } = chai;

const exampleLinks = [];
const comparisonResults = [];
let goldenPath = '';
const goldenDir = path.join(__dirname, '..', 'goldens/');
const diffDir = path.join(__dirname, '..', 'diff/');
let resultLog = '';

When('I look through all examples', { timeout: -1 }, () => checkExamples());
Then('Examples are the same as before', () => { expect(comparisonResults).to.equal([]) });

After(() => expect(resultLog).to.equal(''));

async function getAllExamples() {

	const exampleElements = element(by.className('mat-nav-list')).all(by.tagName('a'));
	const count = await exampleElements.count();

	for (let i = 0; i < count; i++) {
		let elem = await exampleElements.get(i);
		exampleLinks[i] = await elem.getAttribute('href');
	};
}

async function checkExamples() {

	await getAllExamples();

	for (let i = 0; i < exampleLinks.length; i++) {

		let current = exampleLinks[i].split('/')[3];
		await browser.get(current);
		goldenPath = goldenDir + current + ' is the same.png';

		let currentScreenshot = await browser.takeScreenshot();
		blueharvest.compareScreenshot(currentScreenshot, goldenPath, diffDir).catch((result) => comparisonResults[i] = result);

		await browser.manage().logs().get('browser').then(function(browserLog) {
			if (browserLog.length > 0) {
			let errorLog = '\nThere are errors in ' + current + ':\n';
			browserLog.map((item) => { errorLog += JSON.stringify(item.message) + '\n' });
			resultLog += errorLog;
			}
		})
	}
}