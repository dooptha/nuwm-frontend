module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "mocha": true
  },
  "rules": {
    // "valid-jsdoc": ["error", {
    //   "requireReturn": true,
    //   "requireReturnType": true,
    //   "requireParamDescription": true,
    //   "requireReturnDescription": true
    // }],
    // "require-jsdoc": ["error", {
    //     "require": {
    //         "FunctionDeclaration": true,
    //         "MethodDefinition": true,
    //         "ClassDeclaration": true
    //     }
    // }],
  "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  "react/prop-types": [0],
  "arrow-parens": [2, "always"]
  }
}
