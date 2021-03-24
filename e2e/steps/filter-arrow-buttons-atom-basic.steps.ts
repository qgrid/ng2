import { When } from 'cucumber';
import { element, by, browser, protractor } from 'protractor';

When('I sort column {string}', async (col: string) =>
    sortColumn(col)
);


async function sortColumn(col) {
    return element(by.xpath(`//label[contains(text(), '${col}')]/../mat-icon[contains(text(), 'arrow_downward')]`)).click();
}
