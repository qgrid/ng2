const buttonText = 'chevron_right';

import { When } from 'cucumber';
import { element, by } from 'protractor';

When('I click expand button', () => click());

function click() {
	return element.all(by.buttonText(buttonText)).get(0).click();
}
