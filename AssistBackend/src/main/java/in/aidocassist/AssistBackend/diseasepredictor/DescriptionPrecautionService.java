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
import java.util.List;
import java.util.Optional;

@Service
public class DescriptionPrecautionService {

    private List<CSVRecord> csvRecords;

    @Autowired
    public DescriptionPrecautionService(ResourceLoader resourceLoader) throws IOException {
        Reader in = new InputStreamReader(resourceLoader.getResource("classpath:Disease_desc_prec.csv").getInputStream());
        csvRecords = CSVFormat.DEFAULT.withFirstRecordAsHeader().parse(in).getRecords();
    }

    public Optional<CSVRecord> getRecordFromDisease(String disease) {
        return csvRecords.stream().filter(record -> record.get("Disease").equals(disease)).findFirst();
    }
}
