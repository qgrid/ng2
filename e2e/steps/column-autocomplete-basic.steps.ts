import { When } from 'cucumber';
import { element, by, protractor } from 'protractor';

When('I delete a character', () => deleteChar());

function getEditor() {
	return element(by.css('.q-grid-editor-content'));
}

function getInput() {
	const editor = getEditor();
	return editor.element(by.css('.mat-input-element'));
}

async function deleteChar() {
	const input = getInput();
	await input.sendKeys(protractor.Key.BACK_SPACE);
}
