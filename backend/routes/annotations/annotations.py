from flask import Blueprint, jsonify, request, make_response
from dotenv import load_dotenv
from flask_jwt_extended import  jwt_required
import datetime
from models import db, Optimized_annotations
from geoalchemy2.shape import to_shape
from geoalchemy2.elements import WKTElement, WKBElement
from sqlalchemy import text

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

def get_annotation_buffer(annot):
    return {
    'id': annot.id,
    'segmentation': to_shape(WKTElement(annot.segmentation)).wkt,
    'bbox': to_shape(WKBElement(annot.bbox)).wkt,
    'spine':  to_shape(WKBElement(annot.spine)).wkt,
    'category': annot.category,
    'bbox_buffer': to_shape(WKBElement(annot.bbox_buffer)).wkt,
    'spine_buffer': to_shape(WKBElement(annot.spine_buffer)).wkt,
    'segmentation_buffer': to_shape(WKBElement(annot.segmentation_buffer)).wkt,
    }

annotations_bp = Blueprint('annotations', __name__)


@annotations_bp.route('/', methods=['GET'])
# @jwt_required
def get_all_annotations():
    annotations = Optimized_annotations.query.all()
    return jsonify([get_annotation_object(annot) for annot in annotations])


@annotations_bp.route('/chirality/<chirality>', methods=['GET'])
# @jwt_required
def get_annotation_given_chirality(chirality):
    annotations = Optimized_annotations.query.filter(Optimized_annotations.category == chirality).all()
    return jsonify([get_annotation_object(annot) for annot in annotations])

@jwt_required
@annotations_bp.route('/buffer/<bufferDistance>', methods=['GET'])
# @jwt_required
def get_annotations_buffer(bufferDistance):
    SQL_QUERY = f"select id, category, ST_ASTEXT(segmentation) segmentation, bbox, spine, ST_BUFFER(segmentation, {bufferDistance}) segmentation_buffer, ST_BUFFER(bbox, {bufferDistance}) bbox_buffer, ST_BUFFER(spine, {bufferDistance}) spine_buffer from optimized.annotations order by date_captured limit 100"
    result = db.session.execute(text(SQL_QUERY))
    annotations = result.fetchall()
    return jsonify([get_annotation_buffer(annot) for annot in annotations])
# 
@jwt_required
@annotations_bp.route('/date_captured/<date_captured>', methods=['GET'])
def get_annotation_on_date(date_captured):
    annot = Optimized_annotations.query.filter(Optimized_annotations.date_captured == date_captured).all()
    return jsonify(get_annotation_object(annot[0]))

@jwt_required
@annotations_bp.route('/<annot_id>', methods=['GET'])
def get_one_annotation(annot_id):
    annot = Optimized_annotations.query.get(annot_id)
    return jsonify(get_annotation_object(annot))
