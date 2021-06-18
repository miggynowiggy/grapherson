import os
from flask import Flask, request, jsonify
import train_predict
import download_file


app = Flask(__name__)

@app.route('/', methods=['GET'])
def hello_world():
    return 'Welcome to Grapherson ML-API!'

@app.route('/analyze', methods=['POST'])
def analyze():
    filename = request.json['filename']
    downloadURL = request.json['downloadURL']
    print(filename, downloadURL)

    if not filename:
        return jsonify({ 'message': 'missing filename' }), 400

    if not downloadURL:
        return jsonify({ 'message': 'missing downloadURL' }), 400


    savedFile = download_file.start(filename, downloadURL)
    results = train_predict.start(savedFile)
    # os.remove(savedFile)
    return jsonify(results), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)