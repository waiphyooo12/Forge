package net.physiqueForge.ems.swagger;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                .title("Physique Forge Backend API")
                .version("1.0")
                .description("API Documentation for the Project")
                .contact(new Contact().name("Zwe Nyan Win").email("zwenyanwin435@email.com")));
    }
}
