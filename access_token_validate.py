# app.py
from flask import Flask, request, jsonify
import jwt
from jwt.exceptions import InvalidTokenError
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'

def token_required(f):
    def wrap(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = data['user']
        except InvalidTokenError:
            return jsonify({'message': 'Token is invalid!'}), 401
        
        return f(current_user, *args, **kwargs)
    
    return wrap

@app.route('/protected', methods=['GET'])
@token_required
def protected_route(current_user):
    return jsonify({'message': f'Welcome {current_user}!'})

@app.route('/login', methods=['POST'])
def login():
    auth_data = request.get_json()
    if auth_data['username'] == 'admin' and auth_data['password'] == 'password':
        token = jwt.encode({
            'user': 'admin',
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        }, app.config['SECRET_KEY'], algorithm="HS256")
        
        return jsonify({'token': token})
    
    return jsonify({'message': 'Invalid credentials!'}), 401

if __name__ == '__main__':
    app.run(debug=True)


*********************************************

curl -X POST http://localhost:5000/login -H "Content-Type: application/json" -d '{"username": "admin", "password": "password"}'


curl -X GET http://localhost:5000/protected -H "Authorization: Bearer <your_token_here>"
