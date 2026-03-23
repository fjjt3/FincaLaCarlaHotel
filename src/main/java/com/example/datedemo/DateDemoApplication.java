package com.example.datedemo;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(
    info = @Info(
        title = "Date Records API",
        version = "1.0",
        description = "Simple API for storing dates with names"
    )
)
public class DateDemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DateDemoApplication.class, args);
    }
}
