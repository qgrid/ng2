import { When } from 'cucumber';
import { element, by } from 'protractor';

When('I select page[{int}] in custom pager', (index) => selectPageNavigation(index));

async function selectPageNavigation(index) {
    let el = element(by.tagName(`example-plugin-my-pager`))
        .all(by.tagName(`li`));
    await el.get(index).click();
}