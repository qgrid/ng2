import { When } from 'cucumber';
import { element, by, protractor } from 'protractor';

When('I change value from keyboard', () => element(by.className('mat-input-element')).sendKeys(protractor.Key.UP, protractor.Key.ENTER));
