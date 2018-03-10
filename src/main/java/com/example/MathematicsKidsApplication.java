package com.example;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.user.controllers.HomeController;

@SpringBootApplication
public class MathematicsKidsApplication {
	public static void main(String[] args) {
		SpringApplication.run(MathematicsKidsApplication.class, args);
	}
}
