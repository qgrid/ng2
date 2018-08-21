import { When, Given, Then } from 'cucumber';
import { element, by, browser, ExpectedConditions as until } from 'protractor';
import { protractor } from 'protractor/built/ptor';

const chai = require('chai').use(require('chai-as-promised'));
const { expect } = chai;

When('I click on cell of type text', () => clickCell().then(() => setInitialValue()));
Then('Editor value', () => getEditorValue().then(value => expect(value).to.be.equal(initialValue)));
When('I change editor value', () => changeValue());
Then('Editor new value', () => getEditorValue().then(value => expect(value).to.be.equal(`${initialValue}Changed`)));
When('I close editor via Enter key', () => pressEnter());
Then('Editor value should be saved', () => getCellValue().then(value => expect(value).to.be.equal(`${initialValue}Changed`)));

let initialValue;

function setInitialValue() {
	element(by.css('.q-grid-editor-content input')).getAttribute('value').then(value => initialValue = value);
}

function clickCell() {
	return element.all(by.css('.q-grid-text > span')).first().click()
	.then(() =>
			browser.wait(
				until.presenceOf(
					element(by.css('.q-grid-editor-content input'))
				),
				5000));
}

function pressEnter() {
	return browser.actions().sendKeys(protractor.Key.ENTER).perform();
}

function changeValue() {
	return element(by.css('.q-grid-editor-content input')).sendKeys('Changed');
}

function getEditorValue() {
	return element(by.css('.q-grid-editor-content input')).getAttribute('value');
}

function getCellValue() {
	return element.all(by.css('.q-grid-text > span')).first().getText();
}
