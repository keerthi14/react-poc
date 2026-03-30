from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/login": {"origins": "*"}}, supports_credentials=True)

VALID_USERNAME = "admin"
VALID_PASSWORD = "password123"

def validate_input(data):
    username = data.get("username", "")
    password = data.get("password", "")
    if not isinstance(username, str) or not isinstance(password, str):
        return False, "Username and password must be strings"
    if not username or len(username) < 3:
        return False, "Username must be at least 3 characters long"
    if not password or len(password) < 6:
        return False, "Password must be at least 6 characters long"
    return True, ""

def check_credentials(username, password):
    return username == VALID_USERNAME and password == VALID_PASSWORD


@app.route('/')
def index():
    return jsonify({"message": "Flask backend running"}), 200
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    if not data:
        return jsonify({"error": "Missing JSON body"}), 400

    is_valid, error_message = validate_input(data)
    if not is_valid:
        return jsonify({"error": error_message}), 400

    username = data["username"]
    password = data["password"]
    if not check_credentials(username, password):
        return jsonify({"message": "Invalid username or password"}), 401

    return jsonify({"message": "Login successful"}), 200

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
