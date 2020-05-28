import { When } from 'cucumber';
import { element, by, browser } from 'protractor';

When('I expand group[{int}]', (index) => expandGroup(index));
When('I collapse group[{int}]', (index) => collapseGroup(index));

async function expandGroup(index) {
    let el = element.all(by.className(`q-grid-collapse`))
        .get(index);
    await el.click();
}

async function collapseGroup(index) {
    let el = element.all(by.className(`q-grid-expand`))
        .get(index);
    await el.click();
}
