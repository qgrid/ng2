import { When } from 'cucumber';
import { browser, element, by } from 'protractor';

When('I expand folder [{int}]', (index) => clickCollapsedFolder(index));
When('I collapse folder [{int}]', async (index) => clickOpenedFolder(index));

async function clickCollapsedFolder(index) {
    await browser.sleep(1000);
    return element(by.tagName(`tbody`))
        .all(by.xpath(`//*[text()=' folder ']`))
        .get(index)
        .click();
}

async function clickOpenedFolder(index) {
    await browser.sleep(1000);
    element(by.tagName(`tbody`))
        .all(by.xpath(`//*[text()=' folder_open ']`))
        .get(index)
        .click();
}