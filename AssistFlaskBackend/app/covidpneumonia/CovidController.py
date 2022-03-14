from app import application as app
from app.covidpneumonia import *
from flask import jsonify, request
import tensorflow as tf
import cv2
import numpy as np

classes = ['Covid', 'Non-Covid Lung Infection', 'Normal', 'Viral Pneumonia']

REQUESTMAPPING = "/covidpneumonia"

@app.route(REQUESTMAPPING+"/predict", methods=['POST'])
def get_covid_pred():
    img = request.files['img']
    img = cv2.imdecode(np.fromstring(img.read(), np.uint8), cv2.IMREAD_COLOR)
    return jsonify({"pred": predict_covid(img)})

def predict_covid(img):
    prediction = model.predict(tf.constant([img], dtype=tf.float32))
    return  classes[tf.argmax(prediction, axis = 1).numpy()[0]]
