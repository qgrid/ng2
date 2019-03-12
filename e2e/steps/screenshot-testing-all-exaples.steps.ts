import { Then, When } from 'cucumber';
import { browser, element, by } from 'protractor';
import * as blueharvest from 'blue-harvest';
import * as path from 'path';

const chai = require('chai').use(require('chai-as-promised'));
const { expect } = chai;

const exampleLinks = [];
let goldenPath = '';
const goldenDir = path.join(__dirname, '..', 'goldens/');
const diffDir = path.join(__dirname, '..', 'diff/');

When('I look through all examples', () => getAllExamples());
Then('Examples are the same as before', { timeout: -1 }, () => checkExamples());

async function getAllExamples() {

	const exampleElements = element(by.className('mat-nav-list')).all(by.tagName('a'));
	const count = await exampleElements.count();

	for (let i = 0; i < count; i++) {
		let elem = await exampleElements.get(i);
		exampleLinks[i] = await elem.getAttribute('href');
	};
}

async function checkExamples() {
	for (let i = 0; i < exampleLinks.length; i++) {		
		let current = exampleLinks[i].split('/')[3];
		await browser.get(current);
		goldenPath = goldenDir + current + ' is the same.png';
		let currentScreenshot = await browser.takeScreenshot();
		await expect(await blueharvest.compareScreenshot(currentScreenshot, goldenPath, diffDir))
														.to
														.satisfy(result => result.includes('The test passed. ') || result.includes('was successfully updated'))
	}
}