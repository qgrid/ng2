import { When } from 'cucumber';
import { element, by, browser } from 'protractor';

When('I select option with index [{int}]', (index: number) => selectOptionFromDropdown(index));

async function selectOptionFromDropdown(index) {
	const option = element(by.css('.mat-select-panel'))
		.all(by.css('.mat-option'))
		.get(index);
	await browser.sleep(1000);
	await option.click();
}
