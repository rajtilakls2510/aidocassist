package in.aidocassist.AssistBackend.diseasepredictor;

import in.aidocassist.AssistBackend.UnknownInputException;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/disease")
public class DiseaseController {

    private final SymptomsService symptomsService;
    private final PredictorService predictorService;
    private final DescriptionPrecautionService precautionService;

    @Autowired
    public DiseaseController(
            SymptomsService symptomsService,
            PredictorService predictorService,
            DescriptionPrecautionService precautionService) {
        this.symptomsService = symptomsService;
        this.predictorService = predictorService;
        this.precautionService = precautionService;
    }

    @GetMapping
    public ResponseEntity<List<SymptomHolder>> getSymptoms(){
        List<SymptomHolder> allSymptoms;
        try {
            allSymptoms = symptomsService.getAllSymptoms();
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(allSymptoms, HttpStatus.OK);
    }

    @PostMapping(path = "/predict")
    public ResponseEntity<?> predictDisease(@RequestBody PredictionRequestPayload requestPayload) {
        PredictorService.DiseaseOutput diseaseOutput;
        PredictionResponsePayload responsePayload;
        Optional<CSVRecord> recordFromDisease;

        try{
            diseaseOutput = predictorService.predictOutput(
                    predictorService.convertToInput(requestPayload.getSymptoms())
            );
            responsePayload = new PredictionResponsePayload(diseaseOutput.getOutputLabel(), diseaseOutput.getProbability());
        }catch (UnknownInputException e){
            return new ResponseEntity<String>("There might be some invalid input", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        recordFromDisease = precautionService.getRecordFromDisease(diseaseOutput.getOutputLabel());

        if(recordFromDisease.isPresent())
        {
            CSVRecord record = recordFromDisease.get();

            responsePayload.setDescription(record.get("Description"));
            List<String> precautions = responsePayload.getPrecautions();
            for(int i=0;i<4;i++){
                if(!record.get(i+2).isEmpty()) {
                    precautions.add(record.get(i+2));
                }
            }
        }
        else
            return new ResponseEntity<PredictionResponsePayload>(responsePayload, HttpStatus.OK);
        return new ResponseEntity<PredictionResponsePayload>(responsePayload, HttpStatus.OK);
    }


}
