import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next', 'next/core-web-vitals', 'next/typescript', 'prettier'],
    plugins: ['prettier'],
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
      'arrow-body-style': 'off',
      'arrow-parens': ['error', 'as-needed'],
      'comma-spacing': 'error',
      'eol-last': 'error',
      'import/no-absolute-path': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.test.ts',
            '**/*.spec.ts',
            '**/*.test.tsx',
            '**/*.spec.tsx',
            '**/*.style.ts',
            './configuration/**/*',
            './scripts/**/*',
            '*eslint*',
          ],
        },
      ],
      'init-declarations': ['error', 'always'],
      'jsx-quotes': 'error',
      'no-multiple-empty-lines': [
        'error',
        {
          max: 2,
          maxBOF: 0,
          maxEOF: 4,
        },
      ],
      'no-new-wrappers': 'error',
      'no-param-reassign': 'error',
      'object-curly-spacing': ['error', 'always'],
      'one-var': ['error', 'never'],
      'prefer-arrow-callback': 'off',
      'prefer-template': 'error',
      'prettier/prettier': [
        'warn',
        {
          printWidth: 80,
        },
      ],
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
        },
      ],
      'react-hooks/exhaustive-deps': 'error',
      'react/jsx-uses-react': 'error',
      'react/no-unstable-nested-components': 'off',
      semi: ['error', 'always'],
      'semi-spacing': ['error'],
      'no-extra-boolean-cast': 'off',
      'import/no-cycle': 2,
    },
  }),
];

export default eslintConfig;
