import { When } from 'cucumber';
import { element, by, ExpectedConditions as until, browser } from 'protractor';

When('I click "Select all" checkbox', () => clickSelectAll());
When('I click "Cancel" button on pop-up', () => clickCancelButton());


function getEditFormBody() {
	return element(by.css('.cdk-overlay-pane'));
}


function clickCancelButton() {
	const editor = getEditFormBody();
	// const elem = driver.find_elements_by_xpath('//button[.//span[contains(.,\'Cancel\')]]');
	const elem = editor.element(by.xpath('//button[.//span[contains(.,\'Cancel\')]]'));
	browser.wait(until.presenceOf(elem), 5000, 'Element taking too long to appear in the DOM');
	elem.click();
}

function clickSelectAll() {
	const editor = getEditFormBody();
	return editor.element(by.xpath('//span[contains(.,\'Select All\')]')).click();
}
