import { Then, When } from 'cucumber';
import { browser, element, by } from 'protractor';
import * as blueharvest from 'blue-harvest';
import * as path from 'path';

const chai = require('chai').use(require('chai-as-promised'));
const { expect } = chai;
const config = require('../example-configs.json');

const exampleLinks = [];
let comparisonResults = '';
let goldenPath = '';
const goldenDir = path.join(__dirname, '..', 'goldens/');
const diffDir = path.join(__dirname, '..', 'diff/');
let resultLog = '';

When('I look through all examples', () => getAllExamples());
Then('Examples are the same as before', { timeout: -1 }, () => checkExamples());
Then('There are no errors', () => expect(comparisonResults.concat(resultLog)).to.equal(''));

async function getAllExamples() {

	const exampleElements = element(by.className('mat-nav-list')).all(by.tagName('a'));
	const count = await exampleElements.count();

	for (let i = 0; i < count; i++) {
		const elem = await exampleElements.get(i);
		exampleLinks[i] = await elem.getAttribute('href');
	}
}

async function checkExamples() {

	for (let i = 0; i < exampleLinks.length; i++) {

		const current = exampleLinks[i].split('/')[3].split('?')[0];
		goldenPath = goldenDir + current + ' is the same.png';

		if (config.ignoreList.indexOf(current) === -1) {

			await browser.get(current + '?env=test');
			if (config.timeoutList[current] > 0) {
				await browser.sleep(config.timeoutList[current]);
			}

			const currentScreenshot = await browser.takeScreenshot();
			blueharvest.compareScreenshot(currentScreenshot, goldenPath, diffDir).catch((result) => comparisonResults += result + '\n');

			await browser.manage().logs().get('browser').then((browserLog) => {
				if (browserLog.length > 0) {
					let errorLog = '\nThere are errors in ' + current + ':\n';
					browserLog.map((item) => { errorLog += JSON.stringify(item.message) + '\n'; });
					resultLog += errorLog;
				}
			});
		}
	}
}
