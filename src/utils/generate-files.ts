import nunjucks from "nunjucks";
import path from "path";
import fs from "fs";
import { Entity } from "../types";

export async function generateFiles() {
  const entity: Entity = {
    name: "Persona",
    type: "Persona",
    properties: [
      { name: "nombre", type: "string" },
      { name: "apellido", type: "string" },
      { name: "direccion", type: "Direccion" },
      { name: "edad", type: "string" },
      {
        name: "direccion",
        type: "direccion",
        properties: [{ name: "nombre", type: "string" }],
      },
    ],
  };
  const nunjucksEnv = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(path.join(process.cwd(), "templates")),
    { autoescape: false }
  );
  nunjucksEnv.addFilter("is_entity", function (obj) {
    return true;
  });
  const filledTemplate = nunjucksEnv.render("clases.template", { entity });
  fs.writeFile(
    "clase.java",
    filledTemplate,
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
        console.log(fs.readFileSync("clase.java", "utf8"));
      }
    }
  );
  return true;
}
