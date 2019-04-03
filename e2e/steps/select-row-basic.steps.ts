import { When } from 'cucumber';
import { element, by, browser } from 'protractor';

When('I select all items', () => selectAllItems());
When('I select item[{int}]', (index) => selectItem(index));

async function selectAllItems() {
	let el = await element(by.xpath('//mat-checkbox[@aria-label="Select all"]'));
	el.click();
}

async function selectItem(index) {
	let el = await element.all(by.xpath('//mat-checkbox[@aria-label="Select"]')).get(index);
	el.click();
}