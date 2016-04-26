module.exports = {
  'env': {
    'es6': true,
    'node': true
  },
  'plugins': [
    'promise'
  ],
  'extends': 'eslint:recommended',
  'parserOptions': {
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      2,
      2
    ],
    'linebreak-style': [
      2,
      'unix'
    ],
    'quotes': [
      1,
      'single'
    ],
    'semi': [
      2,
      'always'
    ]
  }
};
