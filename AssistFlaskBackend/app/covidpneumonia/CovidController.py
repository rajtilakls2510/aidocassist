from app import application as app
from app.covidpneumonia import *
from flask import jsonify, request
import cv2
import numpy as np

classes = ['Covid', 'Non-Covid Lung Infection', 'Normal', 'Viral Pneumonia']

REQUESTMAPPING = "/covidpneumonia"

@app.route(REQUESTMAPPING+"/predict", methods=['POST'])
def get_covid_pred():
    img = request.files['img']
    return jsonify({"pred": predict_covid(cv2.imdecode(np.fromstring(img.read(), np.uint8), cv2.IMREAD_COLOR))})

def predict_covid(img):
    prediction = model(tf.cast(tf.constant([img]), dtype=tf.float32)).numpy()[0]
    pred = []
    for class_, prob in zip(classes, prediction):
        pred.append({"label": class_, "probability": prob.item()})
    return  pred
