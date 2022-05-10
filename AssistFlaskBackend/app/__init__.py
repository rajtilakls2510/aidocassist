from flask import Flask
from flask_cors import CORS
import tensorflow as tf

# Setting up application and giving access to cross origins
application = Flask(__name__)
CORS(application, resources={r"*": {"origins": "*"}})

# All routes of the Disease Predictor
from app.diseasepredictor import DiseaseController
from app.covidpneumonia import CovidController
from app.fracturedetector import FractureController
from app.breastcancer import BreastController


