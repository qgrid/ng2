import { When } from 'cucumber';
import { element, by } from 'protractor';

When('I click {string} button', text => element(by.buttonText(text)).click());
