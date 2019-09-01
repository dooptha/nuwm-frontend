/* eslint-disable */
import prodConfig from './production';
import devConfig from './development';

let overrideConfig;

if (__DEV__) {
  const development = Object.assign(prodConfig, devConfig);
  try {
    overrideConfig = require('./override.js');
    let config = Object.assign(development, overrideConfig.default);
    console.info("Found config/override.js file default config will be modified");
    console.info("Config:", config);
    module.exports = config;
  } catch (e) {
    console.info("Config:", development);
    module.exports = development;
  }
} else {
  module.exports = prodConfig;
}
