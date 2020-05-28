import { When } from 'cucumber';
import { browser, element, by } from 'protractor';

When('I click add button', () => getAddButton().click());
When('I click on cell {string}[{int}]', (key, index) => getCell(key, index).click());
When('I delete row[{int}]', (index) => deleteRow(index));

function getAddButton() {
	return element(by.xpath(`//*[(text()='add')]`));
}

function stringToClassName(string: string) {
	return (string.charAt(0).toLowerCase() + string.slice(1).toLowerCase()).replace(/\s/g, '.');
}

function getCell(key, index) {
	const tr = element.all(by.tagName('tbody'))
		.get(1)
		.all(by.css('tr[q-grid-core-source=body]'))
		.get(index);
	return tr.element(by.className(`q-grid-the-${stringToClassName(key)}`));
}

async function deleteRow(index) {
	openRowMenu(index);
	await browser.sleep(1000);
	let deleteOption = element(by.xpath(`//*[text()='Delete Row']`));
	await deleteOption.click();
}

async function openRowMenu(index) {
	await browser.sleep(1000);
	const tr = element.all(by.tagName('tbody'))
		.get(2)
		.all(by.css('tr[q-grid-core-source=body]'))
		.get(index);
	await tr.click();
}