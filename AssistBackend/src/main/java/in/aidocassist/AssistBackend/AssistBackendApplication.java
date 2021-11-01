package in.aidocassist.AssistBackend;

import in.aidocassist.AssistBackend.diseasepredictor.DescriptionPrecautionService;
import in.aidocassist.AssistBackend.diseasepredictor.PredictorService;
import in.aidocassist.AssistBackend.diseasepredictor.SymptomsService;
import org.apache.commons.csv.CSVRecord;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;
import java.util.Optional;

@SpringBootApplication
public class AssistBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(AssistBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner runner1(SymptomsService diseaseSymptomsService, PredictorService diseasePredictorService, DescriptionPrecautionService precautionService) {

        // Loads model and predict an output

        return args -> {
            diseaseSymptomsService.getAllSymptoms().forEach(symptomHolder -> {
                System.out.println(symptomHolder.getSymptom()+" "+symptomHolder.getType());
            });

            PredictorService.DiseaseOutput diseaseOutput = diseasePredictorService.predictOutput(diseasePredictorService.convertToInput(List.of(
                    "fatigue",
                    "weight_loss",
                    "restlessness",
                    "lethargy",
                    "excessive_hunger"
//                    "increased_appetite"
            )));
            System.out.println(diseaseOutput.getOutputLabel() + " = " + diseaseOutput.getProbability());
            Optional<CSVRecord> recordFromDisease = precautionService.getRecordFromDisease(diseaseOutput.getOutputLabel());
            if(recordFromDisease.isPresent())
            {
                CSVRecord record = recordFromDisease.get();
                System.out.println("Description: "+ record.get("Description"));
                for(int i=0;i<4;i++){
                    if(!record.get(i+2).isEmpty()) {
                        System.out.println("Precaution"+(i+1)+" : "+record.get(i+2));
                    }
                }
            }
            else
                System.out.println("No Description or Precautions found");
        };


    }
}
