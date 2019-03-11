import { When } from 'cucumber';
import { element, by, browser, ExpectedConditions as until } from 'protractor';

When('I choose page size {int}', {timeout: 20 * 5000}, size => openPageSizeSelect().then(() => selectPageSizeOption(size)));

function openPageSizeSelect() {
	return element(by.css('mat-select.q-grid-pager-page-size'))
		.click()
		.then(() =>
			browser.wait(
				until.presenceOf(
					element(by.css('.mat-option-text'))
				),
				20 * 5000));
}


function selectPageSizeOption(size) {
	return element(by.cssContainingText('.mat-option-text', '' + size)).click();
}
