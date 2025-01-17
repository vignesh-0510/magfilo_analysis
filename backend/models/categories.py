from . import db

class Categories(db.Model):
    cat_id = db.Column(db.Integer, primary_key=True)
    super_category = db.Column(db.String(10), nullable=False)
    category = db.Column(db.String(15), unique=True, nullable=False)

    def __repr__(self):
        return f"Categories ('{self.id}', '{self.category}')"