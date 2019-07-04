import { When } from 'cucumber';
import { element, by, protractor } from 'protractor';

When('I change value from keyboard', () => element.all(by.className('mat-input-element')).get(1).sendKeys(protractor.Key.UP, protractor.Key.RIGHT, protractor.Key.UP, protractor.Key.RIGHT, protractor.Key.UP, protractor.Key.ENTER));
