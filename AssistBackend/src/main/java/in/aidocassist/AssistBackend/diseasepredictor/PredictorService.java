package in.aidocassist.AssistBackend.diseasepredictor;

import in.aidocassist.AssistBackend.UnknownInputException;
import org.pmml4s.model.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.FileNotFoundException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PredictorService {

    private Model model;
    public static final String NO_DISEASE="Looks Fine";

    @Autowired
    public PredictorService() throws FileNotFoundException {
        this.model = Model.fromFile(ResourceUtils.getFile("classpath:RFClassifier.pmml"));
    }

    public Object[] convertToInput(List<String> rawInputs) throws UnknownInputException {
        Map<String, Integer> values = new HashMap<>();
        for (String name : model.inputNames()) {

            values.put(name, 0);
        }
        for(String input:rawInputs){
            try {
                values.put(input, 1);
            }catch (Exception e){
                throw new UnknownInputException("Input not found: "+input);
            }
        }
        return Arrays.stream(model.inputNames()).map(values::get).toArray();
    }

    public DiseaseOutput predictOutput(Object[] input){
        Object[] results = model.predict(input);
        String[] outputNames = model.outputNames();
        String output = NO_DISEASE;
        Double max = 0d;
        for (int i = 0; i < results.length; i++) {
            if ((Double) results[i] > max) {
                max = (Double) results[i];
                output = outputNames[i].substring("probability(".length(), outputNames[i].length() - 1);

            }
        }
        return new DiseaseOutput(output, max);
    }

    public class DiseaseOutput{
        private final String outputLabel;
        private final Double probability;

        public DiseaseOutput(String outputLabel, Double probability) {
            this.outputLabel = outputLabel;
            this.probability = probability;
        }

        public String getOutputLabel() {
            return outputLabel;
        }

        public Double getProbability() {
            return probability;
        }
    }

}
