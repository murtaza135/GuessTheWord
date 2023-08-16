module.exports = {
  extends: [
    'airbnb-base'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    requireConfigFile: true,
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules'],
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never'
    }],
    indent: ['off', 2],
    'max-len': ['error', {
      code: 100,
      ignoreStrings: true,
      ignoreComments: true,
      ignoreTemplateLiterals: true
    }],
    'comma-dangle': 'off',
    'linebreak-style': 'off',
    'lines-between-class-members': 'off',
    'import/prefer-default-export': 'off',
    'prefer-arrow-callback': ['off', { allowUnboundThis: true }],
    'arrow-body-style': 'off',
    'func-names': 'off',
    'no-use-before-define': ['off', {
      functions: true,
      classes: false,
      variables: true,
      allowNamedExports: false
    }],
    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: '^error$|^req$|^res$|^next$|^this$',
      ignoreRestSiblings: true,
      destructuredArrayIgnorePattern: '[A-Za-z]'
    }],
    'no-unused-vars': ['warn', {
      argsIgnorePattern: '^error$|^req$|^res$|^next$|^this$',
      ignoreRestSiblings: true,
      destructuredArrayIgnorePattern: '[A-Za-z]'
    }],
    'no-underscore-dangle': ['error', { allow: ['__dirname', '_id', '__v'] }],
    'object-curly-newline': ['off', {
      ObjectExpression: 'always',
      ObjectPattern: {
        multiline: true,
        minProperties: 6,
        consistent: true
      }
    }],
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn'
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['./src', 'node_modules'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts']
    },
    'import/extensions': ['.js', '.ts']
  }
};
