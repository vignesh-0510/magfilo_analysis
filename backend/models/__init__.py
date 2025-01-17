from flask_sqlalchemy import SQLAlchemy

# Initialize SQLAlchemy instance
db = SQLAlchemy()

# Import models so they are registered with SQLAlchemy
from .optimized_annotations import Optimized_annotations
from .annotations import Annotations
from .categories import Categories
from .images import Images
