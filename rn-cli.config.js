const blacklist = require('react-native/packager/blacklist');

const config = {
  getBlacklistRE(platform) {
    return blacklist(platform, [
      /node_modules|build|.idea|.git|android|ios/
    ]);
  }
};

module.exports = config;