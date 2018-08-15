import { When } from 'cucumber';
import { element, by } from 'protractor';

When('I click load button', () => click('refresh'));
When('I click clear button', () => click('clear_all'));

function click(text) {
	return element(by.buttonText(text)).click();
}
