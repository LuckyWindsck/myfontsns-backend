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
    'import',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
    },
  },
  rules: {
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'import/extensions': [
      'error',
      { ts: 'ignorePackages' },
    ],
    'newline-per-chained-call': 'off',
    'no-console': [
      'warn',
      { allow: ['log', 'error'] },
    ],
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'no-public' },
    ],
    '@typescript-eslint/sort-type-union-intersection-members': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' },
        'newlines-between': 'always',
      },
    ],
    'sort-imports': [
      'error',
      { ignoreDeclarationSort: true },
    ],
  },
};
