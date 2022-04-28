module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'arrow-parens': 0,
    'no-underscore-dangle': 0,
    'object-curly-newline': 0,
  },
};
