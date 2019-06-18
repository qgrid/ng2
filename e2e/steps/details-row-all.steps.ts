import { When } from 'cucumber';
import { element, by, protractor } from 'protractor';

When('I click expand button [{int}]', (index: number) => clickChevronButton(index));

function clickChevronButton(index) {
	return element.all(by.xpath('//*[contains(text(),\' chevron_right \')]')).get(index).click();
}
