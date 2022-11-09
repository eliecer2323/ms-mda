from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class {{entity.name}}(db.Model):
    id = db.Column("{{entity.name}}_id", db.Integer, primary_key=True)
    {% for property in entity.properties %}
    {{entity.name}}_{{property.name}} = db.Column(db.{{property.type}}(100))
    {% endfor %}
    
    def __init__(self, datos):
        {% for property in entity.properties %}
        self.{{entity.name}}_{{property.name}} = datos["{{property.name}}"]
        {% endfor %}
        