from flask import Flask, request, jsonify, render_template, session, redirect
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
import certifi
import bcrypt
from bson import ObjectId
from werkzeug.utils import secure_filename
from bson import json_util
from flask import request, current_app as app
import base64
import os
from werkzeug.utils import secure_filename

# replace and check!

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# hello is db name under the cluster remember in emmylynx@gmail account
MONGO_URI ='mongodb+srv://emmelyn:8UFj649vhqFBAG7S@cluster0.bavtigl.mongodb.net/hello?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true'
app.config['MONGO_URI'] = MONGO_URI
mongo = PyMongo(app,tlsCAFile=certifi.where())
# login_manager = LoginManager()
app.secret_key='949d81bc5128e4c624d8d71c5683204525a25634a5f37cbd5b20607df7bb88c4'
# login_manager.init_app(app)
print(mongo)
print(mongo.db)
print(mongo.db.users)



@app.route("/")
@cross_origin()
def home():
    return "Home"



@app.route("/contactme", methods=["POST"]) 
@cross_origin()
def user_input():
    data = request.get_json()  # Get data as JSON
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")


    if name and email:
        collection = mongo.db.contact #collection is users in db hello
    
    
        data = {
            "name": name,
            "email": email, 
            "message": message
        }


        result = collection.insert_one(data)

        return jsonify({"message": "Message sent successfully!"}),201
    else:
        return jsonify({"message": "Please enter both your name and email"}),400
    
@app.route('/create_user', methods=['POST'])
@cross_origin()
def register_user():
    # Check and log the data received
  

    # Retrieve image file from the form data
    # if 'image' in request.files:
    #     profile_image = request.files['image']
    #     mongo.save_file(profile_image.filename,profile_image) # file name and binary data
   
    
    # else:
    #     return jsonify({'message': 'No image provided'}), 400

    email = request.form['email']
    password = request.form['password']
    username = request.form['username']

    # Check if user already exists
    if mongo.db.users.find_one({'email': email}):
        return jsonify({'message': 'User already exists'}), 409

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Create user document
    user_data = {
        'username': username,
        'email': email,
        'password': hashed_password,
        # 'profile_image': profile_image.filename  # Include the Base64 encoded image
    }
 

    # Insert user into the database
    mongo.db.users.insert_one(user_data)
    return jsonify({'message': 'User registered successfully'}), 201

# @app.route("/create_user", methods=["POST"]) 
# @cross_origin()
# def register_user():
#     data = request.get_json()  # Get data as JSON
#     email = data.get("email")
#     password = data.get("password")


#     if email and password:
#         collection = mongo.db.users #collection is users in db hello
#         existing_user = collection.find_one({"username": email})

#         if existing_user:
#             return jsonify({"message": "Username or email already exists."}), 409

#         hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

#         data = {
#             "username": email,
#             "password": hashed_password
#         }

#         collection = mongo.db.users 
#         result = collection.insert_one(data)

#         return jsonify({"message": "User registered successfully", "user_id": str(result.inserted_id)}),201
#     else:
#         return jsonify({"message": "Please enter both email and password"}),400

@app.route("/login_user", methods=["POST"])
@cross_origin()
def login_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    user = mongo.db.users.find_one({"email": email})
    if user and bcrypt.checkpw(password.encode('utf-8'), user["password"]):
        return jsonify({"message": "Login successful", "user_id": str(user["_id"])}), 200
    else:
        return jsonify({"message": "Invalid username or password"}), 401


@app.route("/add_course", methods=["POST"])
@cross_origin()
def register_course():
    data = request.get_json()
    code = data.get("code")
    name = data.get("name")
    info = data.get("info")

    if code and name and info:
        courses_collection = mongo.db.courses 
        if courses_collection.find_one({"code": code}):
            return jsonify({"message": "Code already exists."}), 409

      
        course = {
            "code": code,
            "name": name, 
            "info": info
        }
        courses_collection.insert_one(course)
        return jsonify({"message": "course registered successfully"}), 201
    else:
        return jsonify({"message": "Missing code or name"}), 400

    

@app.route("/get_courses", methods=["GET"])
@cross_origin()  
def get_courses():
    try:
        courses_collection = mongo.db.courses
        courses = list(courses_collection.find({}, {'code': 1, 'name': 1, 'info':1})) 
        for course in courses:
            course['_id'] = str(course['_id'])  # Convert ObjectId to string
        return jsonify(courses)
    except Exception as e:
        app.logger.error(f"Error getting courses: {str(e)}")  # Log the error
        return jsonify({"error": "Server error"}), 500
    

@app.route("/get_course/<course_id>", methods=["GET"])
@cross_origin()
def get_course(course_id):
    courses_collection = mongo.db.courses
    course = courses_collection.find_one({"_id": ObjectId(course_id)})
    if course:
        course['_id'] = str(course['_id'])  # Convert ObjectId to string for JSON compatibility
        return jsonify(course)
    else:
        return jsonify({"error": "Course not found"}), 404


@app.route("/add_review", methods=["POST"])
@cross_origin()
def register_review():
    data = request.get_json()
    print(data)
    difficulty = data.get("difficulty")
    workload = data.get("workload")
    support = data.get("support")
    engagement = data.get("engagement")
    information =data.get("information")
    courseid =data.get("courseid")
    userid=data.get("userid")


    if difficulty and workload and support and engagement and information and courseid:
        reviews_collection = mongo.db.reviews 
      
        review = {
            "difficulty": difficulty,
            "workload": workload,
            "support": support, 
            "engagement": engagement, 
            "information": information, 
            "course_id": courseid, 
            "user_id": userid,
        }
        reviews_collection.insert_one(review)
        return jsonify({"message": "review added successfully"}), 201
    else:
        return jsonify({"message": "Missing field"}), 400


    
@app.route("/get_reviews/<course_id>", methods=["GET"])
@cross_origin()
def get_reviews(course_id): 
    reviews_collection= mongo.db.reviews
    try: 
        reviews = list(reviews_collection.find({"course_id": course_id}))
        for review in reviews: 
            review['_id'] = str(review['_id'])
        return jsonify(reviews)
    except Exception as e: 
        return jsonify({"error": str(e)}), 500

@app.route("/get_user/<user_id>", methods = ["GET"]) 
@cross_origin()
def get_user(user_id):
    users_collection = mongo.db.users
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if user:
        
        return jsonify(user['username'])
    else:
        return jsonify({"error": "user not found"}), 404

from flask import current_app

@app.route("/file/<filename>")  # Better to use filename directly
@cross_origin()
def get_file(filename):
    try:
        grid_fs_file = mongo.db.fs.files.find_one({'filename': filename})
        if grid_fs_file is None:
            return 'File not found', 404
        return mongo.send_file(filename)
    except Exception as e:
        current_app.logger.error(f'Failed to send file: {str(e)}')
        return 'Internal server error', 500




if __name__ == "__main__":
    app.run(debug=True)

