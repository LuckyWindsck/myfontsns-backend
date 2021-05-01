module.exports = {
  env: {
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'jest',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.ts',
        ],
      },
    },
  },
  rules: {
    'import/extensions': [
      'error',
      {
        ts: 'ignorePackages',
      },
    ],
    'no-console': [
      'warn',
      {
        allow: ['log'],
      },
    ],
  },
};
