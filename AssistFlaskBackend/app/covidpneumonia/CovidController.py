from app import application as app
from app.covidpneumonia import *
from flask import jsonify, request
import tensorflow as tf

classes = ['Covid', 'Non-Covid Lung Infection', 'Normal', 'Viral Pneumonia']

@app.route("/covidpneumonia")
def get_covid_pred():
    input_image = tf.random.uniform(shape=(1,170,250,3), maxval=255)
    prediction = model.predict(input_image)
    return jsonify({"pred": classes[tf.argmax(prediction, axis = 1).numpy()[0]]})
