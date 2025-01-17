from flask import Blueprint, jsonify, request, make_response
from dotenv import load_dotenv
from flask_jwt_extended import  jwt_required
import datetime
from models import db, Optimized_annotations
from geoalchemy2.shape import to_shape
from sqlalchemy import text
from urllib.parse import unquote

load_dotenv()
def get_polygon_list(polygon_string):
    
    return [[float(val) for val in i.split(' ')] for i in polygon_string[10:-2].split(', ')]

def get_line_list(line_string):
    print(line_string)
    return [[float(val) for val in i.split(' ')] for i in line_string[12:-1].split(', ')]

def get_annotation_object(annot):
    return {
    'id': annot.id,
    'segmentation': to_shape(annot.segmentation).wkt,
    'area': float(annot.area),
    'iscrowd': annot.iscrowd,
    'image_id': annot.image_id,
    'bbox': to_shape(annot.bbox).wkt,
    'spine':  to_shape(annot.spine).wkt,
    'category': annot.category,
    'date_captured': annot.date_captured,
    'url': annot.url,
    'category_id': annot.category_id
    }

queries_bp = Blueprint('queries', __name__)


@queries_bp.route('/', methods=['GET'])
# @jwt_required
def get_all_annotations():
    annotations = Optimized_annotations.query.all()
    return jsonify([get_annotation_object(annot) for annot in annotations[:10]])


@queries_bp.route('/image_id/<image_id>', methods=['GET'])
# @jwt_required
def get_annotations_on_image_id(image_id):
    annotations_query = Optimized_annotations.query.filter(Optimized_annotations.image_id == image_id).all()
    annotations_obj = []
    for annot in annotations_query:
        annotations_obj.append(get_annotation_object(annot))
    return jsonify(annotations_obj)

@queries_bp.route('/date_captured/<date_captured>', methods=['GET'])
# @jwt_required
def get_annotations_on_date_captured(date_captured):
    SQL_QUERY = f"select id image_id, url, date_captured, file_name from public.images where date_captured <= \'{unquote(date_captured)}\'::timestamp order by date_captured desc limit 1"
    result = db.session.execute(text(SQL_QUERY))
    keys = result.keys()
    result = result.fetchone()
    jsonData = {}
    for k, attr in zip(keys, result):
        jsonData[k] = attr

    return jsonify({'data': jsonData})


@queries_bp.route('/<annot_id>', methods=['GET'])
@jwt_required
def get_one_annotation(annot_id):
    annot = Optimized_annotations.query.get(annot_id)
    return jsonify(get_annotation_object(annot))

@queries_bp.route('/<annot_id>/info', methods=['GET'])
def get_one_annotation_info(annot_id):
    SQL_QUERY = f'''Select 
	category,
	ST_AREA(segmentation) area_segmentation, 
	ST_AREA(bbox) area_bbox, 
	ST_PERIMETER(segmentation) perimeter_segmentation, 
	ST_LENGTH(spine) length_spine,
	ST_AREA(segmentation)/ST_AREA(bbox) roundness_ratio,
	ST_LENGTH(spine)/ST_LENGTH(ST_BoundingDiagonal(bbox)) curvyness_ratio,
	(ST_XMax(bbox) - ST_XMin(bbox))/ (ST_YMax(bbox) - ST_YMin(bbox)) aspect_ratio
from optimized.annotations
where id = \'{annot_id}\''''
    result = db.session.execute(text(SQL_QUERY))
    keys = result.keys()
    result = result.fetchone()
    jsonData = {}
    for k, attr in zip(keys, result):
        jsonData[k] = attr

    return jsonify({'data': jsonData})

