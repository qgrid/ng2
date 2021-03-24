import { When } from 'cucumber';
import {element, by, browser, ExpectedConditions as until, protractor } from 'protractor';

When('I enter {string} value into input field of {string} column', (text1: string, text2: string) => clickSecondRowInput(text1, text2));

function clickSecondRowInput(text1, text2) {
    const elem = element(by.xpath(`//*[contains(@ng-reflect-key,'${text2}')]//input`));
    browser.wait(until.presenceOf(elem), 50000, 'Element taking too long to appear in the DOM');
    elem.click();
    browser.sleep(1000);
	elem.sendKeys(text1, protractor.Key.ENTER);
    browser.sleep(1000);
    for(let i =0; i < 1000000; i++){}
};
