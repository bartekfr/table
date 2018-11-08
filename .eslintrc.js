module.exports = {
  "extends": "airbnb",
  "plugins": [
    "jest"
  ],
  "parser": "babel-eslint",
  "env": {
    "jest/globals": true,
     "browser": true
  },
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/forbid-prop-types": [0],
    "react/no-array-index-key": [0],
    "jsx-a11y/click-events-have-key-events": [0],
    "import/no-extraneous-dependencies": [0],
    "jsx-a11y/no-static-element-interactions": [0],
    "jsx-a11y/label-has-for": [ 2, {
        "components": [ "Label" ],
        "required": {
            "every": [ "id" ],
        },
        "allowChildren": false,
    }],
  },
};
