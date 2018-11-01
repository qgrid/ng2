import { When, Then } from 'cucumber';
import { element, by, browser, ExpectedConditions as until } from 'protractor';
const chai = require('chai').use(require('chai-as-promised'));
const { expect } = chai;

When('I change cell value for column {string} to {string}', (selector, text) => editText(selector, text));
Then('Input value equals to {string}', (text) => getInput().getAttribute('value').then((value) => expect(value).to.equal(text)));
Then('No validation errors', () => getValidatorErrors().then((value) => expect(value).to.be.null));
// And No validation errors
// When I change value to ""
// Then Validation error equals to "REQUIRED"
function getEditor() {
	return element(by.css('.q-grid-editor-content'));
}

function getInput() {
	const editor = getEditor();
	return editor.element(by.css('.mat-input-element'));
}

function getValidatorErrors() {
	return getEditor()
		.then(() =>
			browser.wait(
				until.presenceOf(
					element(by.css('.q-grid-validator'))
				),
				5000))
		.then((validator) => {
			const span = validator.element(by.cssContainingText('span', 'TOO_SHORT'));
			return span.getAttribute('value');
		});
}

function editText(selector, text) {
	const input = getInput();
	input.sendKeys(text);
}
