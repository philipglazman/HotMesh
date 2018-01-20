module.exports = {
  env: { browser: true, node: true, es6: true },
  parser: "babel-eslint",
  plugins: ['react'],
  rules: {
    // Errors
    eqeqeq: ["error", "smart"],
    "no-cond-assign": "error",
    "no-const-assign": "error",
    "no-dupe-args": "error",
    "no-dupe-class-members": "error",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-empty": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-func-assign": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-sparse-arrays": "error",
    "no-undef": "error",
    "no-use-before-define": ["error", "nofunc"],

    // Warnings
    "array-bracket-spacing": ["warn", "never"],
    "comma-dangle": [
      "warn",
      // Has to use object syntax because of backwards compatibility of the
      // `function` option. See https://eslint.org/docs/rules/comma-dangle
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "always-multiline",
      },
    ],
    "no-console": ["warn", { allow: ["error"] }],
    "no-constant-condition": "warn",
    "no-extra-parens": ["warn", "all", { ignoreJSX: "multi-line" }],
    "no-fallthrough": "warn",
    "no-unneeded-ternary": "warn",
    "no-unused-vars": [
      "warn",
      { varsIgnorePattern: "^_(omit)?", argsIgnorePattern: "^_(omit)?" },
    ],
    "no-var": "warn",
    "object-curly-spacing": ["warn", "always"],
    "object-shorthand": "warn",
    "prefer-arrow-callback": "warn",
    "prefer-const": "warn",
    "prefer-spread": "warn",
    quotes: ["warn", "double"],

    // == React ==

    // Errors
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',

    // Warnings
    'react/no-danger': 'warn',
    'react/no-direct-mutation-state': 'warn',
    'react/no-unknown-property': 'warn',
    'react/prop-types': 'warn',
    'react/self-closing-comp': 'warn',
    'react/jsx-closing-bracket-location': [
      'warn',
      {selfClosing: 'tag-aligned', nonEmpty: 'after-props'},
    ],
  },
};
