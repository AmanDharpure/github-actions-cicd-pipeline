module.exports = [
  {
    files: ["src/**/*.js", "tests/**/*.js", "scripts/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        console: "readonly",
        process: "readonly",
        module: "readonly",
        require: "readonly",
        describe: "readonly",
        test: "readonly",
        expect: "readonly",
        __dirname: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      eqeqeq: "error",
      semi: ["error", "always"],
      quotes: ["error", "double"]
    }
  },
  {
    ignores: [
      "node_modules/**",
      "coverage/**",
      "dist/**",
      "staging-deployment/**"
    ]
  }
];