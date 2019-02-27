import { When } from 'cucumber';
import { element, by, protractor } from 'protractor';

When('I click edit button [{int}]', (index: number) => getEditButton(index));
When('I enter {string} into {string} field', (text: string, field: string) => enterText(text, field));
When('I click "Is Female" checkbox', () => clickIsFemale());

function getEditButton(index) {
	return element.all(by.xpath("//*[(text()='edit')]")).get(index).click();
}

function getEditFormBody() {
	return element(by.css('.q-grid-edit-form-body'));
}

function getFormInput(field) {
	const editor = getEditFormBody();
	return editor.element(by.xpath("//*[(text()='" + field + "')]/../../input"));
}

async function enterText(text:string, field: string) {
	const input = getFormInput(field);
	await input.clear();
	await input.sendKeys(text, protractor.Key.ENTER);
}

function clickIsFemale() {
	const editor = getEditFormBody();
	return editor.element(by.xpath("//span[(text()=' Is Female ')]")).click();
}