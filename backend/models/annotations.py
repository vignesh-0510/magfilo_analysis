from . import db
from geoalchemy2 import Geometry
from geoalchemy2.shape import to_shape
from shapely.geometry import Point

class Annotations(db.Model):
    __tablename__ = 'annotations'
    id = db.Column(db.String(50), primary_key=True)
    segmentation = db.Column(Geometry(geometry_type='POLYGON', srid=4326), nullable=False)
    bbox = db.Column(Geometry(geometry_type='POLYGON', srid=4326), unique=True, nullable=False)
    spine = db.Column(Geometry(geometry_type='POLYGON', srid=4326), unique=True, nullable=False)
    image_id = db.Column(db.String(200), nullable=False)
    cat_id = db.Column(db.Integer, nullable=False)
    iscrowd = db.Column(db.Integer)

    def __repr__(self):
        return f"Annotations('{self.name}', '{self.email}')"