import { When } from 'cucumber';
import { element, by, browser } from 'protractor';

When('I scroll page down [{int}]', async (num: number) => scrollElementVerticalOnValue(await element.all(by.tagName('tbody')).get(0).getWebElement(), num));
When('I scroll page up [{int}]', async (num: number) => scrollElementVerticalOnValue(await element.all(by.tagName('tbody')).get(0).getWebElement(), -num));

async function scrollElementVerticalOnValue(elem, crement) {
    browser.executeScript('arguments[0].scrollTop = arguments[0].scrollTop + arguments[1]', elem, crement);
}
