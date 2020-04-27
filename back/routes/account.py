from api import app

from flask import request, Response, jsonify

from libs.mongo import db, ObjectId, bson_to_json

@app.route('/register', methods=['PUT'])
def register():
    if db.accounts.find_one({
        'userlogin': request.json['userlogin']
    }):
        return Response("Login already used", 403)

    db.accounts.insert_one({
        field_name: request.json[field_name]
        for field_name in (
            'userlogin', 'userpassword',
            'last_name', 'first_name',
            'promotion', 'enterprise',
            'wage', 'working_city'
        )
    })

    return Response("OK", status=204)

@app.route('/register', methods=['POST'])
def update():
    db.accounts.update_one({
        '_id': ObjectId(request.json['user_id'])
    }, {'$set':{
        field_name: request.json[field_name]
        for field_name in (
            'promotion',
            'enterprise',
            'wage',
            'working_city'
        )
    }})

    return Response("OK", status=204)

@app.route('/login', methods=['POST'])
def login():
    user = db.accounts.find_one({
        'userlogin': request.json['user'],
        'userpassword': request.json['password']
    })

    if user:
        return jsonify(bson_to_json(user))
    else:
        return Response("Invalid credentials", status=403)

@app.route('/students', methods=['GET'])
def search():
    params = {
        key: request.args.get(key, None)
        for key in (
            'promotion', 'specialite', 
            'working_city', 'enterprise'
        )
    }

    for key in tuple(params):
        if params[key] is None:
            del params[key]

    return jsonify(bson_to_json(
        list(db.accounts.find(params))
    ))
