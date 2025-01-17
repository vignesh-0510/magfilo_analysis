from flask import Blueprint, jsonify, request, make_response
from dotenv import load_dotenv
from flask_jwt_extended import  jwt_required
import datetime
from models import db, Categories

import os

load_dotenv()


# Define the Blueprint
categories_bp = Blueprint('categories', __name__)

# Define a route within the Blueprint
@categories_bp.route('/', methods=['GET'])
# @jwt_required
def get_categories():
    categories = Categories.query.all()
    return jsonify([{'cat_id': category.cat_id, 'category': category.category} for category in categories])
    # return jsonify(**categories)