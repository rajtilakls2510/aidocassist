from app import application as app
from app.diseasepredictor import *
from flask import jsonify, request
import numpy as np
import shap, math

REQUESTMAPPING="/disease"
CONTRIB_THRESH=0.05


# GET '/disease' : Returns a list of symptoms with some metadata about them
@app.route(REQUESTMAPPING, methods=["GET"])
def get_symptoms():
    list_symptoms = []
    for index, row in symptom_severity.iterrows():
        list_symptoms.append({"symptom":row['Symptom'], "type":row['Type']})
    return jsonify(list_symptoms), 200

# POST '/disease/predict' : Predicts disease based on input symptoms
#       Input: list of symptoms
#       Output: Predicted Disease, confidence, Shapley Values and Force Plot
@app.route(REQUESTMAPPING+"/predict", methods=['POST'])
def predictDisease():
    try:
        # Retrieving raw symptoms
        input_symptoms_raw = request.get_json()['symptoms']
        input_symptom_dictionary = {}
        for column in sample_data.columns[:-1]:
            input_symptom_dictionary[column]= [1 if column in input_symptoms_raw else 0]

        # Creating Dataframe for model input
        input_symptoms = pd.DataFrame(input_symptom_dictionary)

        # pred_disease: stores the predicted disease name
        # pred_prob: stores the model confidence for pred_disease
        pred_disease, pred_prob = "",0

        # predicting the output using model
        prediction = model.predict_proba(input_symptoms)[0]
        for disease, prob in zip(model.classes_, prediction):
            if prob > pred_prob:
                pred_disease = disease
                pred_prob = prob
    except:
        return "There might be some invalid input", 500
    try:
        # calculating shapley values for the current input
        shap.initjs()
        model_shap = model_explainer.shap_values(input_symptoms)
        class_index = np.where(model.classes_==pred_disease)[0][0]

        # generating the force_plot for the current shap values
        force_plot = shap.force_plot(model_explainer.expected_value[class_index], model_shap[class_index],
                                      input_symptoms.iloc[0], out_names=pred_disease, contribution_threshold=CONTRIB_THRESH)
        shap_html = f"<head>{shap.getjs()}</head><body>{force_plot.html()}</body>"

        input_symptom_shap_values=[]
        for shap_value, feature in zip(model_shap[class_index][0], model_explainer.data_feature_names):
            input_symptom_shap_values.append({"symptom": feature, "shap": shap_value, "present": feature in input_symptoms_raw})

        input_symptom_shap_values.sort(key= lambda symptom: abs(symptom["shap"]), reverse=True)
    except:
        return jsonify({"disease":pred_disease, "probability":pred_prob, "description": "", "precautions":[], "force_plot":"", "shap_values": [], "contribution_threshold": CONTRIB_THRESH}),200
    try:
        # Retrieving the Description and Precautions for the predicted disease
        desc_prec = disease_desc_prec[disease_desc_prec['Disease']==pred_disease]
        disease_description = desc_prec["Description"].values[0]
        disease_precautions=desc_prec.iloc[0, 2:].values.tolist()
        for i in range(len(disease_precautions)):
            if math.isnan(disease_precautions[i]):
                disease_precautions.pop(i)
    except:
       return jsonify({"disease":pred_disease, "probability":pred_prob, "description": "", "precautions":[], "force_plot":shap_html, "shap_values": input_symptom_shap_values, "contribution_threshold": CONTRIB_THRESH}), 200
    return jsonify({"disease":pred_disease, "probability":pred_prob, "description": disease_description, "precautions": disease_precautions, "force_plot":shap_html, "shap_values": input_symptom_shap_values, "contribution_threshold": CONTRIB_THRESH}), 200