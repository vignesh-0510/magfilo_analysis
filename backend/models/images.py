from . import db

class Images(db.Model):
    __table_args__ = {'schema': 'public'}
    __tablename__ = 'images'
    id = db.Column(db.Integer, primary_key=True)
    license = db.Column(db.String(20))
    file_name = db.Column(db.String(200))
    url = None
    height = db.Column(db.Integer, default=2048)
    width = db.Column(db.Integer, default=2048)
    date_captured = db.Column(db.TIMESTAMP(timezone=False),nullable=False)

    def __repr__(self):
        return f"image ('{self.date_captured}', '{self.file_name}')"