from . import db
from geoalchemy2 import Geometry
from geoalchemy2.shape import to_shape
from shapely.geometry import Point

class Optimized_annotations(db.Model):
    __table_args__ = {'schema': 'optimized'}
    __tablename__ = 'annotations'
    id = db.Column(db.Integer, primary_key=True)
    segmentation = db.Column(Geometry(geometry_type='POLYGON', srid=33000), nullable=False)
    area = db.Column(db.Numeric(15,9), nullable=False)
    iscrowd = db.Column(db.Integer)
    image_id = db.Column(db.String(200), nullable=False)
    bbox = db.Column(Geometry(geometry_type='POLYGON', srid=33000), unique=True, nullable=False)
    spine = db.Column(Geometry(geometry_type='POLYGON', srid=33000), unique=True, nullable=False)
    category = db.Column(db.String(50))
    date_captured = db.Column(db.TIMESTAMP(timezone=False),nullable=False)
    url = db.Column(db.String(200))
    category_id = db.Column(db.Integer, nullable=False)
    
    def __repr__(self):
        return f"Annotations('{self.id}', '{self.date_captured}')"