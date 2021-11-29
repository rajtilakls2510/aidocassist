from app import application as app
from app.diseasepredictor import *
from flask import jsonify, request

REQUESTMAPPING="/disease"

@app.route(REQUESTMAPPING, methods=["GET"])
def get_symptoms():
    list_symptoms = []
    for index, row in symptom_severity.iterrows():
        list_symptoms.append({"symptom":row['Symptom'], "type":row['Type']})
    return jsonify(list_symptoms), 200

@app.route(REQUESTMAPPING+"/predict", methods=['POST'])
def predictDisease():
    try:
        input_symptoms = request.get_json()['symptoms']
        input_symptom_dictionary = {}
        for column in sample_data.columns[:-1]:
            input_symptom_dictionary[column]= [1 if column in input_symptoms else 0]

        input_symptoms = pd.DataFrame(input_symptom_dictionary)
        pred_disease, pred_prob = "",0
        prediction = model.predict_proba(input_symptoms)[0]
        for disease, prob in zip(model.classes_, prediction):
            if prob > pred_prob:
                pred_disease = disease
                pred_prob = prob
    except:
        return "There might be some invalid input", 500
    try:
        desc_prec = disease_desc_prec[disease_desc_prec['Disease']==pred_disease]
        disease_description = desc_prec["Description"].values[0]
        disease_precautions=desc_prec.iloc[0, 2:].values.tolist()
    except:
       return jsonify({"disease":pred_disease, "probability":pred_prob, "description": "", "precautions":[]}), 200
    return jsonify({"disease":pred_disease, "probability":pred_prob, "description": disease_description, "precautions": disease_precautions}), 200