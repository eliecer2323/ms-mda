import arg from "arg";

import type { Args, RawOptions } from "../types";

export function parseArgumentsIntoOptions(rawArgs: Args): RawOptions {
  const args = arg(
    {
      "--project-name": String,
      "--data-file": String,
      "--git": Boolean,
      "--yes": Boolean,
      "--install": Boolean,
      "-pn": "--project-name",
      "-df": "--data-file",
      "-g": "--git",
      "-y": "--yes",
      "-i": "--install",
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    projectName: args["--project-name"],
    dataFile: args["--data-file"],
    git: args["--git"] || false,
    install: args["--install"] || false,
    skipPrompts: args["--yes"] || false,
    template: args._[0],
  };
}
