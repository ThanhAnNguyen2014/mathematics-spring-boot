package com.mathematics.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class homeController {
	@RequestMapping("/")
	public String Home() {
		return "index";
	}
	@RequestMapping(value={"/detail"})
	public String Detail() {
		return "detail";
	}
}
