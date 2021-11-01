package in.aidocassist.AssistBackend.diseasepredictor;

import java.util.ArrayList;
import java.util.List;

public class PredictionResponsePayload {

    private String disease;
    private Double probability;
    private String description="";
    private List<String> precautions = new ArrayList<>();

    public PredictionResponsePayload() {
    }

    public PredictionResponsePayload(String disease, Double probability) {
        this.disease = disease;
        this.probability = probability;
    }

    public PredictionResponsePayload(String disease, Double probability, String description, List<String> precautions) {
        this.disease = disease;
        this.probability = probability;
        this.description = description;
        this.precautions = precautions;
    }

    public String getDisease() {
        return disease;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }

    public Double getProbability() {
        return probability;
    }

    public void setProbability(Double probability) {
        this.probability = probability;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getPrecautions() {
        return precautions;
    }

    public void setPrecautions(List<String> precautions) {
        this.precautions = precautions;
    }

    @Override
    public String toString() {
        return "DiseaseResponsePayload{" +
                "disease='" + disease + '\'' +
                ", probability=" + probability +
                ", description='" + description + '\'' +
                ", precautions=" + precautions +
                '}';
    }
}
