import { When, Given, Then } from 'cucumber';
import { element, by, browser, ExpectedConditions as until } from 'protractor';
import { protractor } from 'protractor/built/ptor';

const chai = require('chai').use(require('chai-as-promised'));
const { expect } = chai;

Then('I open cell editor', () => openCellEditor());
Then('I change input value', () => changeInputValue().then(() => verifyInputChanges().then(el => expect(el).to.be.equal('LueChanged'))));
Then('I close cell editor', () => closeCellEditor().then(text => expect(text).to.be.equal('LueChanged')));

function openCellEditor() {
	return element.all(by.css('.q-grid-text > span')).first().click()
	.then(() =>
			browser.wait(
				until.presenceOf(
					element(by.css('.q-grid-editor-content input'))
				),
				5000));
}

function changeInputValue() {
	return element(by.css('.q-grid-editor-content input')).sendKeys('Changed');
}

function verifyInputChanges() {
	return element(by.css('.q-grid-editor-content input')).getAttribute('value');
}

function closeCellEditor() {
	return browser.actions().sendKeys(protractor.Key.ENTER).perform().then(() => element.all(by.css('.q-grid-text > span')).first().getText());
}
