package in.aidocassist.AssistBackend.diseasepredictor;

import java.util.ArrayList;
import java.util.List;

public class PredictionRequestPayload {
    private List<String> symptoms = new ArrayList<>();

    public PredictionRequestPayload() {
    }

    public PredictionRequestPayload(List<String> symptoms) {
        this.symptoms = symptoms;
    }

    public List<String> getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(List<String> symptoms) {
        this.symptoms = symptoms;
    }

    @Override
    public String toString() {
        return "PredictionRequestPayload{" +
                "symptoms=" + symptoms +
                '}';
    }
}
