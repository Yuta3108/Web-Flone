package com.example.DoanWeb.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class ConfigCloundianary {
    @Bean
    public Cloudinary configKey(){
        Map<String,String> config = new HashMap();
        config.put("cloud_name", "dubtdbe8z");
        config.put("api_key", "451336443585482");
        config.put("api_secret", "esbBNHTdhJPKw5ZKT58K4YmIEwI");
        return new Cloudinary(config);
    }
}
