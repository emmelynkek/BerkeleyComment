from flask import Flask, request, jsonify, render_template, session, redirect
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
import certifi
import bcrypt

from bson.objectid import ObjectId
# replace and check!

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
import os
print(os.urandom(24))

# hello is db name under the cluster comment in emmylynx@gmail account
MONGO_URI ='mongodb+srv://emmylynx:TEyeZzZx97IF0ZpD@cluster0.cspxqhh.mongodb.net/hello?retryWrites=true&w=majority&appName=Cluster0&tls=true&tlsAllowInvalidCertificates=true'
app.config['MONGO_URI'] = MONGO_URI
mongo = PyMongo(app,tlsCAFile=certifi.where())
app.secret_key='949d81bc5128e4c624d8d71c5683204525a25634a5f37cbd5b20607df7bb88c4'



@app.route("/")
def home():
    return "Home"

@app.route("/create_user", methods=["POST"])
def register_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if email and password:
        users_collection = mongo.db.users #collections is called contact
        if users_collection.find_one({"email": email}):
            return jsonify({"message": "Email already exists."}), 409

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        user = {
            "email": email,
            "password": hashed_password
        }
        users_collection.insert_one(user)
        return jsonify({"message": "User registered successfully"}), 201
    else:
        return jsonify({"message": "Missing email or password"}), 400


@app.route("/add_course", methods=["POST"])
def register_course():
    data = request.get_json()
    code = data.get("code")
    name = data.get("name")

    if code and name:
        courses_collection = mongo.db.courses 
        if courses_collection.find_one({"code": code}):
            return jsonify({"message": "Code already exists."}), 409

      
        course = {
            "code": code,
            "name": name
        }
        courses_collection.insert_one(course)
        return jsonify({"message": "course registered successfully"}), 201
    else:
        return jsonify({"message": "Missing code or name"}), 400

@app.route("/get_courses", methods=["GET"])
def get_courses():
    courses_collection = mongo.db.courses
    courses = list(courses_collection.find({}, {'code': 1, 'name': 1})) 
    # {} for the first as this means that no query filter
    # {'code': 1, 'name': 1}: This part of the .find() method is the projection. It specifies which fields to include in the returned documents. The 1 means "include this field"
    # it is a list of objects
    for course in courses:
        course['_id'] = str(course['_id'])  # Convert ObjectId to string
    return jsonify(courses)

@app.route("/get_course/<course_id>", methods=["GET"])
def get_course(course_id):
    courses_collection = mongo.db.courses
    course = courses_collection.find_one({"_id": ObjectId(course_id)})
    if course:
        course['_id'] = str(course['_id'])
        return jsonify(course) # return json of course if found
    else:
        return jsonify({"error": "Course not found"}), 404

# @app.route("/contactme", methods=["POST"]) 
# @cross_origin()
# def user_input():
#     data = request.get_json()  # Get data as JSON
#     name = data.get("name")
#     email = data.get("email")
#     message = data.get("message")


#     if name and email:
#         collection = mongo.db.contact #collection is users in db hello
    
    
#         data = {
#             "name": name,
#             "email": email, 
#             "message": message
#         }


#         result = collection.insert_one(data)

#         return jsonify({"message": "Message sent successfully!"}),201
#     else:
#         return jsonify({"message": "Please enter both your name and email"}),400
    


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

# @app.route("/check_user", methods=["POST"])
# def login_user():
#     data = request.get_json()  
#     email = data.get("email")
#     password = data.get("password")

#     if email and password:
#         collection = mongo.db.users  
#         user = collection.find_one({"username": email})

#         if user and bcrypt.checkpw(password.encode('utf-8'),user["password"]): 
#             # create a session for user 
#             session['user_id'] = str(user['_id'])

#             return jsonify({"user_id": str(user['_id'])}), 200
  
#         else: 
#             return jsonify({"message": "Invalid username or password!"}), 401
#     else: 
#             return jsonify({"message": "Enter both email and password"}), 400
    
    
# @app.route("/logout")
# def logout():
#     session["user_id"] = None
#     return redirect("/")
        


# @app.route("/insert", methods=["POST"])
# def insert_data():
#     if 'user_id' in session:#CHECK! if this is the right way to check for session from react
#         user_id = session['user_id'] 
#         name = request.form.get("name")
#         age = request.form.get("age")

#         if name and age:
#             data = {
#                 "user_id": user_id, 
#                 "name": name,
#                 "age": int(age)
#             }

#             collection = mongo.db.sample_data # replace sample_data with collection name
#             result = collection.insert_one(data)
            
#             return jsonify({"message": "Data inserted successfully", "inserted_id": str(result.inserted_id)})
#         else:
#             return jsonify({"message": "Please provide name and age"})
#     else: 
#         return render_template("login.html")

# # update data based on user id? (another form)


# # get data based on user id ?
# @app.route("/data", methods=["GET"])
# def list_users():
#     collection = mongo.db.sample_data 
#     users_data = collection.find({}, {"_id": 0, "name": 1, "age": 1}) # find with name and age being compulsory
#     users_list = list(users_data)
#     return jsonify(users_list)


if __name__ == "__main__":
    app.run(debug=True)

