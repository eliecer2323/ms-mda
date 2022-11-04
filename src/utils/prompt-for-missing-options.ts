import inquirer from "inquirer";

import type { Options, RawOptions } from "../types";

// default values for unspecified args
const defaultOptions: Options = {
  git: false,
  install: true,
  template: "javascript",
};

// --yes flag is passed
const skipOptions: Omit<Options, "template"> = {
  git: true,
  install: true,
};

export async function promptForMissingOptions(
  options: RawOptions
): Promise<Options> {
  if (options.skipPrompts) {
    options = { ...options, ...skipOptions };
  }

  const questions = [];

  if (!options.file) {
    questions.push({
      type: "input",
      name: "file",
      message: "Please type a filename",
      validate: (value?: string) => !!value,
    });
  }
  // if (!options.template) {
  //     questions.push({
  //         type: 'list',
  //         name: 'template',
  //         message: 'Please choose which project template to use',
  //         choices: [
  //             { name: 'JavaScript', value: 'javascript' },
  //             { name: 'TypeScript', value: 'typescript' }
  //         ],
  //         default: defaultOptions.template
  //     });
  // }

  if (!options.git) {
    questions.push({
      type: "confirm",
      name: "git",
      message: "Initialize a git repository?",
      default: defaultOptions.git,
    });
  }

  if (!options.install) {
    questions.push({
      type: "confirm",
      name: "install",
      message: "Install packages?",
      default: defaultOptions.install,
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    git: options.git || answers.git,
    install: options.install || answers.install,
    template: options.template || answers.template,
  };
}
