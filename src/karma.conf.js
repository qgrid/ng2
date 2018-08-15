// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', '@angular-devkit/build-angular', 'chai-spies', 'chai'],
    plugins: [
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-chai-spies'),
      require('karma-chrome-launcher'),
      require('karma-mocha-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [process.env.TRAVIS ? 'ChromeTravis' : 'ChromeHeadless'],
    customLaunchers: {
      ChromeTravis: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      },
      ChromeDebug: {
        base: 'Chrome',
        flags: [ '--remote-debugging-port=9333' ]
      }
    },
    singleRun: !!process.env.TRAVIS
  });
};
