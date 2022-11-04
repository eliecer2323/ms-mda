import nunjucks from "nunjucks";
import path from "path";
import fs from "fs";
import { Entity } from "../types";

export async function generateFiles(templateDirectory: string) {
  const entity: Entity = {
    name: "persona",
    type: "Persona",
    properties: [
      { name: "nombre", type: "String" },
      { name: "apellido", type: "String" },
      // { name: "direccion", type: "Direccion" },
      { name: "edad", type: "String" },
      // {
      //   name: "direccion",
      //   type: "direccion",
      //   properties: [{ name: "nombre", type: "string" }],
      // },
    ],
  };
  const nunjucksEnv = new nunjucks.Environment(
    // new nunjucks.FileSystemLoader(path.join(process.cwd(), "templates")),
    new nunjucks.FileSystemLoader(templateDirectory),
    { autoescape: false }
  );
  nunjucksEnv.addFilter("is_entity", function (obj) {
    return true;
  });

  const filledModel = nunjucksEnv.render("aplication/models.py", { entity });
  fs.writeFile(
    "models.py",
    filledModel,
    {
      encoding: "utf8",
      flag: "w",
      mode: 0o666,
    },
    (err) => {
      if (err) console.log(err);
      else {
        console.log("File written successfully\n");
        console.log("The written has the following contents:");
        console.log(fs.readFileSync("models.py", "utf8"));
      }
    }
  );

  const filledApp = nunjucksEnv.render("aplication/app.py", { entity });
  fs.writeFile(
    "app.py",
    filledApp,
    {
      encoding: "utf8",
      flag: "w",
      mode: 0o666,
    },
    (err) => {
      if (err) console.log(err);
      else {
        console.log("File written successfully\n");
        console.log("The written has the following contents:");
        console.log(fs.readFileSync("app.py", "utf8"));
      }
    }
  );
  return true;
}
