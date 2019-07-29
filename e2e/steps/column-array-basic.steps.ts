import { When } from 'cucumber';
import { element, by, browser } from 'protractor';
import { Locators } from './locators';

When('I rid of adding value popup', () => element(by.className('q-grid-backdrop')).click());
