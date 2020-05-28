import { When } from 'cucumber';
import { element, by, browser } from 'protractor';

When('I select row[{int}]', (index) => selectRow(index));
When('I select cell[{int}]', (index) => selectCell(index));

async function selectRow(index) {
    await browser.sleep(1000);
    const tr = await element(by.className('q-grid-table-left'))
        .all(by.css(`tr[q-grid-core-source=body]`))
        .get(index);
    tr.click();
}

async function selectCell(index) {
    await browser.sleep(1000);
    const tr = await element(by.className('q-grid-table-center'))
        .all(by.css(`tr[q-grid-core-source=body]`))
        .get(index);
    tr.click();
}
