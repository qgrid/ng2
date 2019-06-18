import { When } from 'cucumber';
import { element, by } from 'protractor';

When('I click add button', () => getAddButton().click());
When('I click on cell {string}[{int}]', (key, index) => getCell(key, index).click());

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
