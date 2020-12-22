module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    indent: [
      'error', 2,
      {
        MemberExpression: 2,
        SwitchCase: 1,
        FunctionDeclaration: {
          parameters: 2,
        },
      },
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    quotes: [
      'error',
      'single',
    ],
    semi: [
      'error',
      'always',
    ],
    'import/no-extraneous-dependencies': ['off'],
    'import/prefer-default-export': ['off'],
    'no-plusplus': ['off'],
    'object-curly-newline': ['off'],
    'no-restricted-syntax': ['off'],
    'no-continue': ['off'],
    'no-use-before-define': ['off'],
    'no-return-assign': ['off'],
    'no-param-reassign': ['off'],
    'no-extra-parens': [
      'error',
      'all',
    ],
  },
};

