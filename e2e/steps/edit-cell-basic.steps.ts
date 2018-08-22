import { When, Given, Then } from 'cucumber';
import { element, by, browser, ExpectedConditions as until } from 'protractor';
import { protractor } from 'protractor/built/ptor';

const chai = require('chai').use(require('chai-as-promised'));
const { expect } = chai;

When('I click on cell of class q-grid-{string}', editorType => clickCell(editorType).then(() => setInitialValue()));
Then('Editor value', () => getEditorValue().then(value => expect(value).to.be.equal(initialValue)));
When('I change editor value to {string}', value => changeValueTo(value));
Then('Editor new value equals to {string}', value => getEditorValue().then(v => expect(v).to.be.equal(value)));
When('I close editor via Enter key', () => pressEnterKey());
Then('Cell new value equals to {string} {string}', (type, value) => getCellValue(type).then(v => expect(v).to.be.equal(value)));

let initialValue;

function setInitialValue() {
	element(by.css('.q-grid-editor-content input')).getAttribute('value').then(value => initialValue = value);
}

function clickCell(type: string) {
	return element.all(by.css(`tr[q-grid-core-source="body"] > td.q-grid-${type}`)).first().click();
}

function pressEnterKey() {
	return browser.actions().sendKeys(protractor.Key.ENTER).perform();
}

function changeValueTo(value: any) {
	const elem = element(by.css('.q-grid-editor-content input'));
	return elem.clear().then(() => elem.sendKeys(value));
}

function getEditorValue() {
	return element(by.css('.q-grid-editor-content input')).getAttribute('value');
}

function getCellValue(type) {
	return element.all(by.css(`.q-grid-${type} > span`)).first().getText();
}
