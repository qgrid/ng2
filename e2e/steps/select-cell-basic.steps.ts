import { When } from 'cucumber';
import { element, by, browser } from 'protractor';

When('I click {string} filter item', (item) => getFilteritem(item));
When('I click Select all', () => getSelectAll());

async function getFilteritem(item) {
	await browser.sleep(1000);
	const el = await element(by.xpath(`//*[text()='${item}']/../..`));
	el.click();
}

async function getSelectAll() {
	await browser.sleep(1000);
	const el = await element(by.xpath(`//*[contains(text(),'Select All')]/..`));
	el.click();
}
