from app import application as app
from app.fracturedetector import *
from flask import jsonify, request
import numpy as np
import cv2, base64

REQUESTMAPPING = "/fracture"

@app.route(REQUESTMAPPING+"/detect", methods=['POST'])
def fracture_detector():
    img = request.files['img']
    img = cv2.imdecode(np.fromstring(img.read(), np.uint8), cv2.IMREAD_COLOR)
    xmin, ymin, xmax, ymax = model(tf.cast(tf.constant([img]), dtype=tf.float32)).numpy()[0]
    imwidth, imheight = img.shape[1], img.shape[0]
    xmin, ymin, xmax, ymax = int(xmin * imwidth / 10), int(
        ymin * imheight / 10), int(xmax * imwidth / 10), int(
        ymax * imheight / 10)
    img = cv2.rectangle(img, (xmin, ymin), (xmax, ymax), (0, 0, 255), 2)
    img_encoded = base64.b64encode(cv2.imencode('.jpg', img)[1]).decode()
    return jsonify({"detected": img_encoded})
