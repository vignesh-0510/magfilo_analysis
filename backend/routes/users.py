from flask import Blueprint, jsonify, request, make_response
from dotenv import load_dotenv
from flask_jwt_extended import  jwt_required, create_access_token
import datetime

import os

load_dotenv()


# Define the Blueprint
users_bp = Blueprint('users', __name__)

# Define a route within the Blueprint
@users_bp.route('/', methods=['GET'])
@jwt_required
def get_users():
    # Here you would usually fetch users from a database
    users = [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]
    return jsonify(users)


@users_bp.route('/login', methods=['POST'])
def login_user():
    print('Inside Login')
    user = request.json.get('user', None)
    password = request.json.get('password', None)
    if (user == os.getenv('DB_USERNAME') and password == os.getenv('DB_PASSWORD')) or (user == 'user' and password == 'pass'):
        access_token = create_access_token(identity=user, fresh=True, expires_delta=datetime.timedelta(minutes=60))
        return jsonify({
            'userId': user,
            'token': access_token
        })
    else:
        return jsonify({
            'userId': user,
            'token': None
        })

@users_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user = request.args.get('user')
    new_token = create_access_token(identity=current_user, fresh=False)
    return jsonify({'token':new_token, 'userId':current_user})
