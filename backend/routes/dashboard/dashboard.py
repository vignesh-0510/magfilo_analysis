from flask import Blueprint, jsonify, request, make_response
from dotenv import load_dotenv
from flask_jwt_extended import  jwt_required
from models import db, Optimized_annotations
from sqlalchemy import text
import numpy as np

import os

load_dotenv()

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/fetch_hemisphere_statistics', methods=['GET'])
# @jwt_required
def fetch_hemishpere_statistics():
    SQL_QUERY = """Select 'Northern Hemisphere' hemisphere , category, count(category) from (select id, category from optimized.annotations where ST_WITHIN(segmentation, 
	ST_SetSRID(
		ST_MakeBox2D(
		ST_Point(0, 1024), ST_Point(2048, 2048)
		),33000)
	)) group by category union
Select 'Southern Hemisphere' hemisphere , category, count(category) from (select id, category from optimized.annotations where ST_WITHIN(segmentation, 
	ST_SetSRID(
		ST_MakeBox2D(
		ST_Point(0, 0), ST_Point(2048, 1024)
		),33000)
	)) group by category order by hemisphere, category"""

    result = db.session.execute(text(SQL_QUERY))
    keys = result.keys()
    hemisphere_data = np.zeros((3,2))
    unique_hemisphere = set()
    unique_chirality = set()

    for idx, row in enumerate(result.fetchall()):
        col_idx = idx//3
        unique_hemisphere.add(row[0])
        unique_chirality.add(row[1])
        hemisphere_data[idx%3][col_idx] = row[2]

    jsonData = {
        'hemisphere': sorted(list(unique_hemisphere)),
        'chirality': sorted(list(unique_chirality)),
        'data': hemisphere_data.tolist()
        }
    return jsonify(jsonData)

@dashboard_bp.route('/fetch_chirality_statistics', methods=['GET'])
# @jwt_required
def get_chirality_division():
    SQL_QUERY = "Select category_id, category, count(category) from optimized.annotations group by category, category_id order by category"
    result = db.session.execute(text(SQL_QUERY))
    keys = result.keys()

    rows = [dict(zip(keys, row)) for row in result.fetchall()]
    return jsonify(rows)

@dashboard_bp.route('/fetch_yearwise_statistics', methods=['GET'])
# @jwt_required
def fetch_yearwise_statistics():

    SQL_QUERY = "Select extract(year from date_captured) year_val, category, count(category) from optimized.annotations group by category, year_val order by year_val, category"
    result = db.session.execute(text(SQL_QUERY))
    keys = result.keys()
    yearwise_data = {}
    unique_years = set()
    unique_labels = set()
    for row in result.fetchall():
        unique_years.add(row[0])
        unique_labels.add(row[1])
        if row[1] not in yearwise_data:
            yearwise_data[row[1]] = {'year': [], 'count':[]};
        yearwise_data[row[1]]['year'].append(row[0]);
        yearwise_data[row[1]]['count'].append(row[2]);
    
    jsonData = {
        'years': sorted(list(unique_years)),
        'chirality': sorted(list(unique_labels)),
        'data': yearwise_data
    }
    return jsonify(jsonData)