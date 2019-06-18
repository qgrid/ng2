import { When } from 'cucumber';
import { element, by, browser } from 'protractor';

When('I scroll table horizontally', async () => await scrollElementLeftOnValue(await element(by.tagName('tbody')).getWebElement(), 1000));

function scrollElementLeftOnValue(elem, value) {
	browser.executeScript('arguments[0].scrollLeft = arguments[1]', elem, value);
}
