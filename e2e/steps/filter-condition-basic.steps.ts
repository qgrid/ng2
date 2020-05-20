import { When, setDefaultTimeout, Before } from 'cucumber';
import { browser, element, by, protractor, ExpectedConditions as until } from 'protractor';
When('I click condition filter button', () => getConditionFilterBtn().click());
When('I add new rules:', { timeout: 60 * 1000 }, async (dataTable) => await customizeRules(dataTable));
When('I set {string} operation', async (andOR) => await setOperation(andOR));
When('I click APPLY button', () => getApplyBtn().click());

async function customizeRules(table) {
    for (let k = 0; k < table.rawTable.length; k++) {
        if (k !== 0) {
            await getAddRuleBtn().click();
        }
        await setRule(table.rawTable[k]);
    }
}

async function setRule(row) {
    await setField(row[0]);
    await setOperator(row[1]);
    await setValue(row[1], row[2]);
}

async function setField(field) {
    if (field !== `Number`) {
        let defaultFields = element.all(by.xpath(`//span[contains(@class,'mat-select-value-text') and contains(.,'Number')]`));
        await defaultFields
            .get(await defaultFields.count() - 1)
            .click();
        await element.all(by.xpath(`//*[contains(@class,'mat-option') and contains(.//span,' ${field} ')]`))
            .click();
    }
}

async function setOperator(operator) {
    if (operator !== `EQUALS`) {
        let defaultOperators = element.all(by.xpath(`//span[contains(@class,'mat-select-value-text') and contains(.,'EQUALS')]`));
        await defaultOperators
            .get(await defaultOperators.count() - 1)
            .click();
        let opt = element.all(by.xpath(`//*[contains(@class,'mat-option-text') and contains(.,' ${operator} ')]`))
        // There was issue whn click LIKE operator in list, so ... hover first then click
        await browser.actions().mouseMove(opt.get(0).getWebElement());
        await opt.get(0).click();
    }
}

async function setValue(operator, value) {
    if (value !== ``) {
        if (operator == `BETWEEN`) {
            let valueInput = element(by.className(`q-grid-query-builder-expression`))
                .all(by.css(`input[placeholder='Select value']`));
            let am = await valueInput.count();
            let values = value.split(`,`);
            await valueInput.get(am - 2).clear();
            await valueInput.get(am - 2).sendKeys(`${values[0].trim()}`);
            await valueInput.get(am - 1).clear();
            await valueInput.get(am - 1).sendKeys(`${values[1].trim()}`);
        } else if (operator == `IN`) {
            let valueInput = element(by.className(`q-grid-query-builder-expression`))
                .all(by.css(`input[placeholder='Select value']`));
            let am = await valueInput.count();
            let values = value.split(`,`);
            await valueInput.get(am - 1).clear();
            values.forEach(async element => {
                await valueInput.get(am - 1).sendKeys(element.trim(), protractor.Key.ENTER);
            });
        } else {
            let valueInput = element(by.className(`q-grid-query-builder-expression`))
                .all(by.css(`input[placeholder='Select value']`));
            let am = await valueInput.count();
            await valueInput.get(am - 1).clear();
            await valueInput.get(am - 1).sendKeys(value);
        }
        // There is an issue about values drop down appearance. This part should be updated after fix
        if (operator == `EQUALS`) {
            await element.all(by.xpath(`//*[contains(@class,'mat-option-text') and contains(.,' ${value} ')]`))
                .get(0)
                .click();
        }
    }
}

async function setOperation(andOR) {
    let defaultOperator = element.all(by.xpath(`//span[contains(@class,'mat-select-value-text') and contains(.,'AND')]`));
    await defaultOperator
        .get(await defaultOperator.count() - 1)
        .click();
    await element.all(by.xpath(`//*[contains(@class,'mat-option') and contains(.//span,' ${andOR} ')]`))
        .click();
}

function getAddGroupBtn() {
    return element(by.tagName(`.q-grid-query-builder-toolbar`))
        .all(by.tagName(`button`))
        .get(1);
}

function getAddRuleBtn() {
    return element(by.tagName(`.q-grid-query-builder-toolbar`))
        .all(by.tagName(`button`))
        .get(1);
}

function getConditionFilterBtn() {
    return element(by.css(`.q-grid-toolbar-top button[aria-label='Query Builder']`));
}

function getApplyBtn(){
    return element(by.xpath(`//button[contains(.//span, 'Apply')]`));
}