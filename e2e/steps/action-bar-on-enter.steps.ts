import { When } from 'cucumber';
import { element, by, browser } from 'protractor';
import { Locators } from './locators';
import { protractor } from 'protractor/built/ptor';

When('I select [{int}] row in the table', (num: number) => Locators.tableRows.get(num).click());

