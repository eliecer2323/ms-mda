import chalk from "chalk";
import Listr from "listr";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { copyTemplateFiles } from "./utils/copy-template-files";
import { renderFiles } from "./utils/render-files";
import { initGitRepo } from "./utils/init-git-repo";
import { installPackages } from "./utils/install-packages";

import type { Options } from "./types";

export async function createProject(options: Options) {
  const targetDirectory = `${process.cwd()}/${options.projectName}`;
  console.log("targetDirectory: ", targetDirectory);
  const currentFileUrl = import.meta.url;
  const templateDirectory = path.resolve(
    decodeURI(fileURLToPath(currentFileUrl)),
    "../../templates",
    "aplication"
    // options.template.toLowerCase()
  );
  const dataFile = fs.readFileSync(`${options.dataFile}`, "utf8");
  const dataModel = JSON.parse(dataFile);
  // console.log(dataModel)

  const tasks = new Listr([
    {
      title: "Copy project files",
      task: () => copyTemplateFiles(templateDirectory, targetDirectory),
    },
    {
      title: "Render project files",
      task: () => renderFiles(targetDirectory, dataModel),
    },
    {
      title: "Initialize git",
      task: () => initGitRepo(targetDirectory),
      enabled: () => options.git,
    },
    // {
    //   title: "Install dependencies",
    //   task: () => installPackages(targetDirectory),
    //   skip: () => {
    //     if (!options.install) {
    //       return "Pass --install or -i to automatically install dependencies";
    //     }
    //   },
    // },
  ]);

  try {
    await tasks.run();

    console.log("%s Project ready", chalk.green.bold("DONE"));
  } catch (error) {
    console.log("%s Error occurred", chalk.red.bold("ERROR"));
  }
}
