package com.als.tasks.config;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

import com.als.tasks.services.DBService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("dev")
public class DevConfig {

    @Autowired
    private DBService dbService;

    @Bean
    public boolean instantiateDatabase() {
        if (!"create".equals(getProperties().getProperty("spring.jpa.hibernate.ddl-auto")))
            return false;

        dbService.instantiateTestDatabase();
        return true;
    }

    private Properties getProperties() {
        Properties props;

        try (BufferedReader br = new BufferedReader(
                new FileReader("src\\main\\resources\\application-dev.properties"))) {
            props = new Properties();
            props.load(br);
            return props;
        } catch (IOException e) {
            System.out.println("Error when loading the properties file: " + e.getMessage());
            return null;
        }

    }
}