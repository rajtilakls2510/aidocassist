import pickle
import shap
import pandas as pd

# Loading models and other dependencies
model = pickle.load(open("resources/diseasepredictor/RFClassifier2.pkl","rb") )
disease_desc_prec = pd.read_csv("resources/diseasepredictor/Disease_desc_prec.csv")
symptom_severity = pd.read_csv("resources/diseasepredictor/New_symptom_severity.csv")
sample_data = pd.read_csv("resources/diseasepredictor/sample_data.csv")
X_train = pickle.load(open("resources/diseasepredictor/RFTrain2.pkl","rb"))
model_explainer = shap.explainers.Tree(model, data=X_train)



