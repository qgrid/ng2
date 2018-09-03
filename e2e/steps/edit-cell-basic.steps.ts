import { When, Given, Then } from 'cucumber';
import { element, by, browser } from 'protractor';
import { protractor } from 'protractor/built/ptor';

const chai = require('chai').use(require('chai-as-promised'));
const { expect } = chai;

When('I click cell of column {string}', column => click(column));
Then('I change editor value to {string}', value => changeValueTo(value));
Then('I press ENTER key', () => pressEnterKey());
Then('Value has been changed to {string}', (value) => cellValue().then(v => expect(v).to.be.equal(value)));

let type;

function click(column: string) {
	type = column;
	return element.all(by.css(`tr[q-grid-core-source="body"] > td.q-grid-${column}`)).first().click();
}

function changeValueTo(value: any) {
	const elem = element(by.css('.q-grid-editor-content input'));
	elem.clear().then(() => elem.sendKeys(value));
}

function pressEnterKey() {
	browser.actions().sendKeys(protractor.Key.ENTER).perform();
}

function cellValue() {
	return element.all(by.css(`.q-grid-${type} > span`)).first().getText();
}
