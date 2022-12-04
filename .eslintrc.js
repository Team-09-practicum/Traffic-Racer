module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'airbnb', 'airbnb/hooks', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    'import/prefer-default-export': 'off',
    'no-multiple-empty-lines': 'error',
    'prefer-const': 'error',
    'no-use-before-define': 'error',
    'object-curly-spacing': [2, 'always'],
    'array-bracket-spacing': [2, 'never'],
    'jsx-quotes': [2, 'prefer-double'],
    quotes: [2, 'single', { allowTemplateLiterals: true }],
    'import/extensions': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-console': 'error',
    semi: 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        semi: true,
      },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-unresolved': ['error', { ignore: ['@*'] }],
    'react-hooks/exhaustive-deps': 2,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-plusplus': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'max-len': ['error', { code: 120, ignoreComments: true }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['**/*.test.tsx', '**/*.test.ts'],
      env: {
        jest: true,
      },
    },
  ],
};
