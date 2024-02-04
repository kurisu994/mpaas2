module.exports = {
  extends: [require.resolve('@feewee/fabric/dist/eslint')],
  rules: {
    'react/jsx-filename-extension': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'max-len': ['error', 180],
    'id-length': ['warn', { min: 1 }],
    eqeqeq: ['off', 'always'],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'no-console': 'off',
    'no-param-reassign': [
      'warn',
      {
        props: true,
        ignorePropertyModificationsFor: ['e', 'res', 'config', 'options'],
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@iceworks/best-practices/no-js-in-ts-project': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@babel/no-unused-expressions': 'off',
  },
};
