package in.aidocassist.AssistBackend.diseasepredictor;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

@Service
public class SymptomsService {

    private List<CSVRecord> csvRecords;

    @Autowired
    public SymptomsService(ResourceLoader resourceLoader) throws IOException {
        Reader in = new InputStreamReader(resourceLoader.getResource("classpath:New_symptom_severity.csv").getInputStream());
        csvRecords = CSVFormat.DEFAULT.withFirstRecordAsHeader().parse(in).getRecords();
    }

    public List<SymptomHolder> getAllSymptoms() throws IOException {
        List<SymptomHolder> symptoms = new ArrayList<>();
        for (CSVRecord record : csvRecords) symptoms.add(new SymptomHolder(record.get("Symptom"), record.get("Type")));
        return symptoms;
    }
}
