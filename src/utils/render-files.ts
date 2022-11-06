import nunjucks from "nunjucks";
import path from "path";
import fs from "fs";
import { Entity } from "../types";

export async function renderFiles(templateDirectory: string, entity: any) {
  // const entity: Entity = {
  //   name: "persona",
  //   type: "Persona",
  //   properties: [
  //     { name: "nombre", type: "String" },
  //     { name: "apellido", type: "String" },
  //     // { name: "direccion", type: "Direccion" },
  //     { name: "edad", type: "String" },
  //     // {
  //     //   name: "direccion",
  //     //   type: "direccion",
  //     //   properties: [{ name: "nombre", type: "string" }],
  //     // },
  //   ],
  // };
  const nunjucksEnv = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(templateDirectory),
    { autoescape: false }
  );
  nunjucksEnv.addFilter("is_entity", function (obj) {
    return true;
  });

  const filledModel = nunjucksEnv.render("models.py", { entity });
  fs.writeFile(
    `${templateDirectory}/models.py`,
    filledModel,
    {
      encoding: "utf8",
      flag: "w",
      mode: 0o666,
    },
    (err) => {
      if (err) console.log(err);
      // else {
      //   console.log("File written successfully\n");
      //   console.log("The written has the following contents:");
      //   console.log("__________________________________\n");
      //   console.log(fs.readFileSync(`${templateDirectory}/models.py`, "utf8"));
      //   console.log("__________________________________\n");
      // }
    }
  );

  const filledApp = nunjucksEnv.render("app.py", { entity });
  fs.writeFile(
    `${templateDirectory}/app.py`,
    filledApp,
    {
      encoding: "utf8",
      flag: "w",
      mode: 0o666,
    },
    (err) => {
      if (err) console.log(err);
      // else {
      //   console.log("File written successfully\n");
      //   console.log("The written has the following contents:");
      //   console.log("__________________________________\n");
      //   console.log(fs.readFileSync(`${templateDirectory}/app.py`, "utf8"));
      //   console.log("__________________________________\n");
      // }
    }
  );
  return true;
}
