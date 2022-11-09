from flask import request

from config_app import create_app, db
from models import persona

app = create_app()

@app.get("/")
def listar():
    data = persona.query.all()
    diccionario_{{entity.name}} = {}
    for d in data:
        p = {
            "id": d.id,
            {% for property in entity.properties %}
            "{{property.name}}": d.{{entity.name}}_{{property.name}},
            {% endfor %}
            
        }
        diccionario_{{entity.name}}[d.id] = p
    return diccionario_{{entity.name}}

@app.post("/")
def agregar():
    req = request.json
    datos = {
        {% for property in entity.properties %}
        "{{property.name}}": req["{{property.name}}"],
        {% endfor %}
    }
    p = {{entity.name}}(datos)
    db.session.add(p)
    db.session.commit()
    return datos

@app.delete("/<int:id>")
def eliminar(id):
    p = {{entity.name}}.query.filter_by(id=id).first()
    db.session.delete(p)
    db.session.commit()
    datos = {
        "id": p.id,
        {% for property in entity.properties %}
        "{{property.name}}": p.{{entity.name}}_{{property.name}},
        {% endfor %}
    }
    return datos

@app.put("/<int:id>")
def editar(id):
    req = request.json
    p = {{entity.name}}.query.filter_by(id=id).first()
    {% for property in entity.properties %}
    p.{{entity.name}}_{{property.name}} = req["{{property.name}}"]
    {% endfor %}
    db.session.commit()
    return req

@app.get("/<int:id>")
def buscar(id):
    p = {{entity.name}}.query.filter_by(id=id).first()
    datos = {
        "id": p.id,
        {% for property in entity.properties %}
        "{{property.name}}": p.{{entity.name}}_{{property.name}},
        {% endfor %}
    }
    return datos


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")