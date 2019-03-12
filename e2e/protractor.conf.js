// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

exports.config = {
  allScriptsTimeout: 11000,
  capabilities: {
    browserName: 'chrome',
    loggingPrefs: {"browser": "SEVERE"},
    chromeOptions: {
      args: ['--headless', '--disable-gpu', '--window-size=1920,1080']
    }
  },
  SELENIUM_PROMISE_MANAGER: false,
  directConnect: true,
  specs: ['./features/*.feature'],
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    // require step definition files before executing features
    require: ['./steps/**/*.ts'],
    // <string[]> (expression) only execute the features or scenarios with tags matching the expression
    tags: [],
    // <boolean> fail if there are any undefined or pending steps
    strict: true,
    // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    format: 'json:results.json',
    // <boolean> invoke formatters without executing steps
    dryRun: false,
    // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    compiler: []
  },
  onPrepare() {
    require('ts-node').register({
      project: './e2e/tsconfig.e2e.json'
    });
    browser.driver.manage().window().setSize(1366, 1024);
  }
};
