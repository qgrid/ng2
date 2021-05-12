import { When } from 'cucumber';
import { element, by, browser, ExpectedConditions as until, protractor } from 'protractor';

When('I sort column {string}', async (columnName: string) =>
    sortColumn(columnName)
);
async function sortColumn(columnName) {
    return element(by.xpath(`//label[contains(text(), '${columnName}')]/../mat-icon[contains(text(), 'arrow_downward')]`)).click();
}

When('I enter {string}', (text: string) => enterTextIntoField(text));

async function enterTextIntoField(text: string) {
    const input = element((by.css('.cdk-overlay-pane input')));
    await browser.sleep(1000);  //sleep is left here as the actions intercross without it and the scenario fails
    await input.clear();
    await input.sendKeys(text, protractor.Key.ENTER);
}

When('I click three-dot button', () => clickMoreButton());

function getFormBody() {
    return element(by.css('.cdk-overlay-pane'));
}

function getInput() {
    return element.all(by.className('mat-input-element')).get(1);
}

async function clickMoreButton() {
    const editor = getFormBody();
    await browser.sleep(1000); //sleeps are placed here for more stable autotest runnings//
    const elem = editor.element(by.css('.cdk-overlay-pane mat-select[role=\'combobox\']'));
    browser.wait(until.presenceOf(elem), 50000, 'Element taking too long to appear in the DOM');
    elem.click();
}

When('I click "Apply"', () => clickApplyButton());

function getEditFormBody() {
    return element(by.css('.cdk-overlay-pane'));
}
async function clickApplyButton() {
    const editor = getEditFormBody();
    await browser.sleep(1000);
    const elem = editor.element(by.xpath('//button[.//span[contains(.,\'Apply\')]]'));
    browser.wait(until.presenceOf(elem), 50000, 'Element taking too long to appear in the DOM');
    await browser.sleep(1000);
    elem.click();
}

When('I enter {string} and {string} value', (text1: string, text2: string) => betweenValues(text1, text2));

function betweenValues(text1, text2) {
    const editor = getEditFormBody();
    //debugger;
    const elem = element(by.css('.q-grid-menu'));
    browser.wait(until.presenceOf(elem), 5000, 'Element taking too long to appear in the DOM');
    const input1 = element.all(by.css('.cdk-overlay-pane input')).get(0);
    input1.clear();
    input1.sendKeys(text1, protractor.Key.ENTER);
    const input2 = element.all(by.css('.cdk-overlay-pane input')).get(1);
    input2.clear();
    input2.sendKeys(text2, protractor.Key.ENTER);
    for (let i = 0; i < 1000000; i++) { }
}

When('I select {string} condition', (cond: string) => selectConditionItem(cond));

async function selectConditionItem(cond) {
    await browser.sleep(1000);
    const elem = element(by.xpath(`//span[normalize-space()='${cond}']`));
    browser.wait(until.visibilityOf(elem), 5000, 'Element taking too long to appear in the DOM');
    elem.click();
    browser.wait(until.invisibilityOf(elem), 5000, 'Element taking too long to appear in the DOM');
}

When('I enter {string} value into input field of {string} column', (text1: string, text2: string) => clickSecondRowInput(text1, text2));

function clickSecondRowInput(text1, text2) {
    const elem = element(by.xpath(`//*[contains(@ng-reflect-key,'${text2}')]//input`));
    browser.wait(until.presenceOf(elem), 50000, 'Element taking too long to appear in the DOM');
    elem.click();
    browser.sleep(1000);
    elem.sendKeys(text1, protractor.Key.ENTER);
    browser.sleep(1000);
    for (let i = 0; i < 1000000; i++) { }
};