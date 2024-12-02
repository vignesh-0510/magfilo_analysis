from flask import Blueprint, jsonify, request, make_response
from dotenv import load_dotenv
from flask_jwt_extended import  jwt_required
import datetime
from models import db, Optimized_annotations
from geoalchemy2.shape import to_shape

load_dotenv()

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

annotations_bp = Blueprint('annotations', __name__)


@annotations_bp.route('/', methods=['GET'])
# @jwt_required
def get_all_annotations():
    annotations = Optimized_annotations.query.all()
    return jsonify([get_annotation_object(annot) for annot in annotations])


@annotations_bp.route('/date_captured/<date_captured>', methods=['GET'])
# @jwt_required
def get_annotation_on_date(date_captured):
    annot = Optimized_annotations.query.filter(Optimized_annotations.date_captured == date_captured).all()
    return jsonify(get_annotation_object(annot[0]))


@annotations_bp.route('/<annot_id>', methods=['GET'])
# @jwt_required
def get_one_annotation(annot_id):
    annot = Optimized_annotations.query.get(annot_id)
    return jsonify(get_annotation_object(annot))
