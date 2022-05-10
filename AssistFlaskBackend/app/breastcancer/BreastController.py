from app import application as app
from app.breastcancer import *
from flask import jsonify, request
import cv2
import numpy as np
import base64

REQUESTMAPPING = "/breastcancer"

@app.route(REQUESTMAPPING+"/segment", methods=['POST'])
def segment_cancer():
    img = request.files['img']
    img = cv2.imdecode(np.fromstring(img.read(), np.uint8), cv2.IMREAD_COLOR)
    prediction = model(tf.constant([img], dtype=tf.float32))[0]
    prediction = tf.image.resize(prediction, img.shape[:2])
    benign_map = cv2.applyColorMap((prediction[:,:,0].numpy()*255).astype(np.uint8), cv2.COLORMAP_JET)
    malignant_map = cv2.applyColorMap((prediction[:, :, 1].numpy() * 255).astype(np.uint8), cv2.COLORMAP_JET)
    benign_superimposed = cv2.addWeighted(img, 0.6, benign_map, 0.4,0)
    malignant_superimposed = cv2.addWeighted(img, 0.6, malignant_map, 0.4,0)
    benign_encoded = base64.b64encode(cv2.imencode('.jpg', benign_superimposed)[1]).decode()
    malignant_encoded = base64.b64encode(cv2.imencode('.jpg', malignant_superimposed)[1]).decode()
    return jsonify({"benign": benign_encoded, "malignant": malignant_encoded})