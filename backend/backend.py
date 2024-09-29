from flask import Flask, request, jsonify, send_from_directory
import os
from flask_cors import CORS, cross_origin

app = Flask(__name__)

CORS(app, resources={r"/upload": {"origins": "http://localhost:3000"}})

# Set the directory where images are stored
IMAGE_FOLDER = 'E:/Team_sentinels/Sentinels/backend/images/'  # Update this path accordingly

# Directory to save uploaded images
UPLOAD_FOLDER = 'backend/uploads/'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
@cross_origin()
def upload_image():
    
    print("here")
    if 'image' not in request.files:
        return jsonify({"error": "No image part"}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if not file.content_type.startswith('image/'):
        return jsonify({"error": "File is not an image"}), 400

    print(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    response = process_image(file_path)
    # response.headers.add('Access-Control-Allow-Origin')
    return response
    

def process_image(file):

    # implement model here
    isForged = True
    image1 = "img1.png" #forgery mask
    image2 = "img2.png" #regions detected

    return jsonify({"isForged" : isForged,
                    "predicted_forgery_mask": image1,
                    "suspicious_regions_detected" : image2})

@app.route('/images/<filename>')
@cross_origin()
def serve_image(filename):
    full_path = os.path.join(IMAGE_FOLDER, filename)
    print(f"Full path to file: {full_path}")
    return send_from_directory(IMAGE_FOLDER, filename)

@app.route('/')
@cross_origin()
def home():
    return jsonify({"message" : "hello"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
