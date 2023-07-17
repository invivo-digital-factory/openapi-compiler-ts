module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript/base',
    'plugin:import/recommended',
    'plugin:import/typescript',
    "plugin:mocha/recommended",
    'plugin:prettier/recommended',
    'prettier'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    project: './tsconfig.json'
  },
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
    'no-underscore-dangle': 'error',
    'consistent-return': 'error',
    'class-methods-use-this': 'error',
    'prefer-destructuring': 'error',
    'prefer-arrow-callback': 'off',
    'no-param-reassign': 'error',
    'no-plusplus': 'error',
    'import/no-cycle': 'error',
    'func-names': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'operator-assignment': ["error", "always"],
    "mocha/no-skipped-tests": "error",
    "mocha/no-exclusive-tests": "error",
    '@typescript-eslint/lines-between-class-members': 'error',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'default', format: ['camelCase'] },
      { selector: 'typeLike', format: ['PascalCase'] },
      { selector: 'variable', format: ['camelCase', 'UPPER_CASE'] }
    ],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: false
        },
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling']
        ],
        'newlines-between': 'always'
      }
    ]
  },
  ignorePatterns: ['**/*.js', '**/*.d.ts'],
  overrides: [
    {
      files: ['*.ts'],
      excludedFiles: ['*.{test,spec,steps}.ts'],
      extends: ['plugin:security/recommended']
    }
  ]
}
