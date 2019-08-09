/* eslint-disable */
import prodConfig from './production';
import devConfig from './development';

let overrideConfig;

if (__DEV__) {
  try {
    overrideConfig = require('./override.js');
    let config = Object.assign(devConfig, overrideConfig.default);
    console.info("Found config/override.js file default config will be modified");
    console.info("Config:", config);
    module.exports = config;
  } catch (e) {
    console.info("Config:", devConfig);
    module.exports = devConfig;
  }
} else {
  module.exports = prodConfig;
}
