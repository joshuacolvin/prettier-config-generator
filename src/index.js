const inquirer = require("inquirer");
const fs = require("fs");

const numberValidator = input =>
  isNaN(input) ? "value must be a number" : true;

const prettierDefaults = {
  printWidth: 80,
  tabWidth: 2,
  tabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  jsxBracketSameLine: true,
  arrowParens: "always",
};

const prettierQuestions = [
  {
    type: "number",
    name: "printWidth",
    message: "Print Width",
    default: 80,
    validate: numberValidator,
  },
  {
    type: "number",
    name: "tabWidth",
    message: "Tab Width",
    default: 2,
    validate: numberValidator,
  },
  {
    type: "confirm",
    name: "tabs",
    message: "Tabs",
    default: false,
  },
  {
    type: "confirm",
    name: "semi",
    message: "Semi",
    default: true,
  },
  {
    type: "confirm",
    name: "singleQuote",
    message: "Single Quote",
    default: false,
  },
  {
    type: "list",
    name: "quoteProps",
    message: "Quote Props",
    default: "as-needed",
    choices: ["as-needed", "consistent", "preserve"],
  },
  {
    type: "confirm",
    name: "jsxSingleQuote",
    message: "JSX Single Quotes",
    default: false,
  },
  {
    type: "list",
    name: "trailingComma",
    message: "Trailing Commas",
    default: "es5",
    choices: ["es5", "none", "all"],
  },
  {
    type: "confirm",
    name: "bracketSpacing",
    message: "Bracket Spacing",
    default: true,
  },
  {
    type: "confirm",
    name: "jsxBracketSameLine",
    message: "JSX Brackets Same Line",
    default: true,
  },
  {
    type: "list",
    name: "arrowParens",
    message: "Arrow Function Parentheses",
    default: "always",
    choices: ["always", "avoid"],
  },
];

const init = async () => {
  const config = await inquirer
    .prompt([
      {
        type: "confirm",
        name: "useDefaults",
        message: "Generate config using Prettier defaults?",
        default: false,
      },
    ])
    .catch(err => new Error(err));

  if (config.useDefaults) {
    writeFile(
      ".prettierrc",
      JSON.stringify(prettierDefaults, null, prettierDefaults.tabWidth)
    );
  } else {
    const answers = await inquirer
      .prompt(prettierQuestions)
      .catch(err => new Error(err));

    writeFile(".prettierrc", JSON.stringify(answers, null, answers.tabWidth));
  }
};

const writeFile = (filename, data) => {
  fs.writeFile(filename, data, err => {
    if (err) return new Error(err);
    console.log(`${filename} successfully created`);
  });
};

init();
