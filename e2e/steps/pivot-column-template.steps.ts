import { When } from 'cucumber';
import { element, by, browser } from 'protractor';

When('I hover first level header[{int}]', (index) => hoverFirstLevelHeader(index));
When('I hover second level header[{int}]', (index) => hoverSecondLevelHeader(index));

async function hoverFirstLevelHeader(index) {
    let el = element(by.tagName(`thead`))
        .all(by.tagName(`tr`))
        .get(0)
        .all(by.tagName(`th`));
    await browser.actions().mouseMove(el.get(index)).perform();
}

async function hoverSecondLevelHeader(index) {
    let el = element(by.tagName(`thead`))
        .all(by.tagName(`tr`))
        .get(1)
        .all(by.tagName(`th`));
    await browser.actions().mouseMove(el.get(index)).perform();
}