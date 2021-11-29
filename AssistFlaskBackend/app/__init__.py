from flask import Flask
from flask_cors import CORS

application = Flask(__name__)
CORS(application, resources={r"*": {"origins": "*"}})

from app.diseasepredictor import DiseaseController


