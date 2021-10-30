package in.aidocassist.AssistBackend;

import org.pmml4s.model.Model;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.util.ResourceUtils;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class AssistBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(AssistBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner runner1() {

        // Loads model and predict an output

        return args -> {
            Model model = Model.fromFile(ResourceUtils.getFile("classpath:RFClassifier.pmml"));
            Map<String, Integer> values = new HashMap<>();
            for (String name : model.inputNames()) {
                ;
                values.put(name, 0);
            }
            values.put("itching", 1);
//            values.put("vomiting", 1);
//            values.put("yellowish_skin", 1);
//			values.put("skin_peeling", 1);
//			values.put("blackheads", 1);
//			values.put("abdominal_pain", 1);
//			values.put("yellowing_of_eyes", 1);


            Object[] valuesMap = Arrays.stream(model.inputNames()).map(values::get).toArray();
            Object[] results = model.predict(valuesMap);
            String[] outputNames = model.outputNames();
            String output = "Looks Fine";
            Double max = 0d;
            for (int i = 0; i < results.length; i++) {
                if ((Double) results[i] > max) {
                    max = (Double) results[i];
                    output = outputNames[i].substring("probability(".length(), outputNames[i].length() - 1) + " = " + results[i];

                }
            }
            System.out.println(output);

        };


    }
}
