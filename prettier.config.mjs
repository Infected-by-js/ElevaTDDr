export default {
  $schema: "https://json.schemastore.org/prettierrc",
  arrowParens: "always",
  bracketSpacing: false,
  printWidth: 150,
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  importOrderParserPlugins: ["typescript"],
  importOrderTypeScriptVersion: "5.0.0",
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: ["^vue$", "^vue-(.*)$", "^@vueuse/(.*)$", "<THIRD_PARTY_MODULES>", "", "<TYPES>", "<TYPES>^[.]"],
}
