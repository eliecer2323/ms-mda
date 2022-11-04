import arg from "arg";

import type { Args, RawOptions } from "../types";

export function parseArgumentsIntoOptions(rawArgs: Args): RawOptions {
  const args = arg(
    {
      "--file": String,
      "--git": Boolean,
      "--yes": Boolean,
      "--install": Boolean,
      "-f": "--files",
      "-g": "--git",
      "-y": "--yes",
      "-i": "--install",
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    file: args["--file"],
    git: args["--git"] || false,
    install: args["--install"] || false,
    skipPrompts: args["--yes"] || false,
    template: args._[0],
  };
}
