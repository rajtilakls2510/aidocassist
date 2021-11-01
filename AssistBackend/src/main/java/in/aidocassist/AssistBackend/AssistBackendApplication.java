package in.aidocassist.AssistBackend;

import in.aidocassist.AssistBackend.diseasepredictor.DescriptionPrecautionService;
import in.aidocassist.AssistBackend.diseasepredictor.PredictorService;
import in.aidocassist.AssistBackend.diseasepredictor.SymptomsService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class AssistBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(AssistBackendApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*").allowedMethods("GET","POST","PUT", "DELETE");
            }
        };
    }
}
