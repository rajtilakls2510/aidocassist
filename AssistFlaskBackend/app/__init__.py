from flask import Flask
from flask_cors import CORS

# Setting up application and giving access to cross origins
application = Flask(__name__)
CORS(application, resources={r"*": {"origins": "*"}})

# All routes of the Disease Predictor
from app.diseasepredictor import DiseaseController


