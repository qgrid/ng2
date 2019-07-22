import { element, by, browser, ElementArrayFinder, ElementFinder } from 'protractor';

export class Locators {
    static tableRows = element.all(by.css('tbody tr[q-grid-core-source=body]'));
}


