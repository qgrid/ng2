import { When } from 'cucumber';
import {element, by, browser, protractor} from 'protractor';

When('I click filter button [{int}]', (index: number) => clickFilterButton(index));
When('I click more button', () => clickMoreButton());
When('I select condition {string}', (cond: string) => selectCondition(cond));
When('I enter {string} and {string}', (date1: string, date2: string) => betweenDates(date1, date2));

function clickFilterButton(index) {
	const el = element.all(by.xpath('//*[contains(text(),\'filter_list\')]')).get(index);
	return el.click();
}

function clickMoreButton() {
	browser.executeScript('document.evaluate(\'//*[@id="mat-select-1"]/div/div[1]/span/mat-select-trigger/mat-icon\', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click()\n');
}

function selectCondition(cond) {
	return element(by.xpath('//*[text() = \'' + cond + '\']')).click();
}

function betweenDates(date1, date2) {
	const input1 = element.all(by.className('mat-input-element')).get(1);
	input1.clear();
	input1.sendKeys(date1, protractor.Key.ENTER);
	const input2 = element.all(by.className('mat-input-element')).get(2);
	input2.clear();
	input2.sendKeys(date2, protractor.Key.ENTER);
}
