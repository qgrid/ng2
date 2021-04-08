import { When } from 'cucumber';
import { element, by, browser } from 'protractor';

When('I click {string} filter item', (item) => getFilteritem(item));

async function getFilteritem(item) {
	await browser.sleep(1000);
	const el = await element(by.xpath(`//*[text()='${item}']/../..`));
	el.click();
}
