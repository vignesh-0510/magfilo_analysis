from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import os
from dotenv import load_dotenv
from urllib.parse import quote_plus

from models import db, Categories, Annotations, Optimized_annotations, Images
from routes.users import users_bp
from routes.categories.categories import categories_bp
from routes.annotations.annotations import annotations_bp
from routes.queries.queries import queries_bp
from routes.dashboard.dashboard import dashboard_bp

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS)
encoded_password = quote_plus(os.getenv('DB_PASSWORD'))
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')  # Used for HS256 algorithm
app.config['JWT_ALGORITHM'] = 'HS256'  # Optional, the default is 'HS256'
jwt = JWTManager(app)

app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{os.getenv('DB_USERNAME')}:{encoded_password}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

app.register_blueprint(users_bp, url_prefix='/users')
app.register_blueprint(dashboard_bp, url_prefix='/api/dashboard')
app.register_blueprint(categories_bp, url_prefix='/api/categories')
app.register_blueprint(annotations_bp, url_prefix='/api/annotations')
app.register_blueprint(queries_bp, url_prefix='/api/queries')

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'Hello from Flask!'}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5050)
