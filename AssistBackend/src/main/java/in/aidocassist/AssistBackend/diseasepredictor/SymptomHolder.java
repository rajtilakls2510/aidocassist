package in.aidocassist.AssistBackend.diseasepredictor;

public class SymptomHolder {
    private String symptom;
    private String type;

    public SymptomHolder() {
    }

    public SymptomHolder(String symptom, String type) {
        this.symptom = symptom;
        this.type = type;
    }

    public String getSymptom() {
        return symptom;
    }

    public void setSymptom(String symptom) {
        this.symptom = symptom;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "SymptomsResponsePayload{" +
                "symptom='" + symptom + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
