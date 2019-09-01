module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "mocha": true
  },
  "plugins": ["jest"],
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
    "react/forbid-prop-types": [1, { "forbid": ["any"] }],
    "react/prop-types": [0],
    "arrow-parens": [2, "always"],
    "class-methods-use-this": [0],
    "no-underscore-dangle": ["error", { "allow": ["_id", "_navigator"] }]
  },
  "env": {
    "jest/globals": true
  },
  "overrides": [
      {
        "files": ["*.test.js", "tests/setup.js"],
        "rules": {
          "no-console": "off",
          "one-var": "off",
          "one-var-declaration-per-line": "off",
          "import/no-named-as-default-member": "off"
        }
      }
    ],
}
