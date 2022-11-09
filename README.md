# Generador de Micro-servicios utilizando Model Driven Application (MS-MDA)

## Proyecto Curricular
Especialización en Ingeniería de Software

## Materia
Informatica 2

## Profesor
Alejandro Paolo Daza Corredor

## Integrantes
|Nombre                           |Código        |Correo Institucional               |
|---------------------------------|--------------|-----------------------------------|
|Jorge Eliecer Sierra Torres      |20222099014   |jesierrat@correo.udistrital.edu.co |
|Pedro Pablo Duarte Rubiano       |20221099002   |pduarter@correo.udistrital.edu.co  |
|Lawrence Eliecer Montoya Orjuela |20221099010   |lmontoyao@correo.udistrital.edu.co |


## Pasos para arrancar
1. npm install
2. npm run build
3. npm link
4. Ubicarse en la ruta donde desea crear su proyecto (cd ....)
5. ms-mda <...args...>
6. Ubicarse en la raiz del proyecto creado (cd <project_name>)
7. docker build . -t test && docker run --name test --rm -p 5001:5000 test

\*algunos comandos pueden requerir ejecución con `sudo` dependiendo de los permisos en su maquina

### Parametros

- **--project-name, -pn \<nombre-del-proyecto\>**

  El proyecto se creara con este nombre.
  
- **--data-file, -df \<archivo-del-modelo\>**
  
  Este archivo será usado para generar el codigo con base en este modelo.
  
- **--git, -g**
  
  Envíe este parametro si quiere inicializar git en el proyecto.
  
- **--yes, -y**
  
  Envíe este parametro si quiere omitir todos los demas parametros y utlizar los valores por defecto, valores por defecto:
  --project-name python-ms
  --data-file data.json
  --git

### Ejemplo de data-file (data.json)

```
{
    "name": "persona",
    "type": "Persona",
    "properties": [
      { "name": "nombre", "type": "String" },
      { "name": "apellido", "type": "String" },
      { "name": "edad", "type": "String" }
    ]
}
```

### API

- Listar todos los elementos

```
curl --location --request GET 'http://localhost:5001' \
--data-raw ''
```

- Insertar un nuevo registro

```
curl --location --request POST 'http://localhost:5001' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nombre": "b",
    "apellido": "b",
    "edad": "12"
}'
```

- Consultar por id

```
curl --location --request GET 'http://localhost:5001/1' \
--data-raw ''
```

- Editar un registro por id

```
curl --location --request PUT 'http://localhost:5001/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nombre": "a",
    "apellido": "b",
    "edad": "12"
}'
```

- Eliminar un registro por id

```
curl --location --request DELETE 'http://localhost:5001/1' \
--data-raw ''
```
