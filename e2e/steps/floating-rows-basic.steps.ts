import { When } from 'cucumber';
import { element, by, browser } from 'protractor';

When('I scroll table down', async () =>
	await scrollElementLeftOnValue(await element.all(by.tagName('tbody')).get(1).getWebElement(), 1000));

function scrollElementLeftOnValue(elem, value) {
	browser.executeScript('arguments[0].scrollTop = arguments[1]', elem, value);
}
