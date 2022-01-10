// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai-spies', 'chai'],
    files: [
      { pattern: 'src/**/*.spec.js', watched: false },
    ],
    plugins: [
      'karma-mocha',
      'karma-chai-spies',
      'karma-chai',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-mocha-reporter'
    ],
    preprocessors: {
      'src/**/*.spec.js': ['webpack'],
    },
    webpack: {
      module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          }
        ]
      }
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    restartOnFileChange: true
  });
};
