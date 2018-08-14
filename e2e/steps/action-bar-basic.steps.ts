import { defineSupportCode } from 'cucumber';
import { element, by } from 'protractor';
import { oneMinuteTimeout } from './steps.helper';

defineSupportCode(({Given, When, Then, Before}) => {
	When('I click {string} button', oneMinuteTimeout, (buttonText) => {
		return element(by.buttonText(buttonText)).click();
	});
});
