import { When, Given, Then } from 'cucumber';
import { element, by, browser, ExpectedConditions as until } from 'protractor';
import { protractor } from 'protractor/built/ptor';

const chai = require('chai').use(require('chai-as-promised'));
const { expect } = chai;

Then('I open cell editor', () => openEditor().then(() => setInitialValue()));
Then('I change input value', () => changeValue().then(() => changedValue().then(el => expect(el).to.be.equal(`${initialValue}Changed`))));
Then('I close cell editor', () => closeEditor().then(text => expect(text).to.be.equal(`${initialValue}Changed`)));

let initialValue;

function setInitialValue() {
	element(by.css('.q-grid-editor-content input')).getAttribute('value').then(value => initialValue = value);
}

function openEditor() {
	return element.all(by.css('.q-grid-text > span')).first().click()
	.then(() =>
			browser.wait(
				until.presenceOf(
					element(by.css('.q-grid-editor-content input'))
				),
				5000));
}

function closeEditor() {
	return browser.actions().sendKeys(protractor.Key.ENTER).perform().then(() => element.all(by.css('.q-grid-text > span')).first().getText());
}

function changeValue() {
	return element(by.css('.q-grid-editor-content input')).sendKeys('Changed');
}

function changedValue() {
	return element(by.css('.q-grid-editor-content input')).getAttribute('value');
}


