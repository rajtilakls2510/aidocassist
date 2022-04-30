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
    center_x, center_y, b_width, b_height = model(tf.cast(tf.constant([img]), dtype=tf.float32)).numpy()[0]
    imwidth, imheight = img.shape[1], img.shape[0]
    xmin, ymin, xmax, ymax = get_bndbox(imwidth, imheight, center_x, center_y, b_width, b_height)
    img = cv2.rectangle(img, (xmin, ymin), (xmax, ymax), (0, 0, 255), 2)
    img_encoded = base64.b64encode(cv2.imencode('.jpg', img)[1]).decode()
    return jsonify({"detected": img_encoded})

def get_bndbox(im_width, im_height, center_x, center_y, b_width, b_height):
  xmin = int(center_x*im_width-b_width*im_width/2)
  xmax = int(center_x*im_width+b_width*im_width/2)
  ymin = int(center_y*im_height-b_height*im_height/2)
  ymax = int(center_y*im_height+b_height*im_height/2)
  return xmin, ymin, xmax, ymax