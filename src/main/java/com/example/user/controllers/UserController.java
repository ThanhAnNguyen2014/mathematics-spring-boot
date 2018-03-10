package com.example.user.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.user.services.SecurityService;
import com.example.user.services.UserServices;

@Controller
public class UserController {
	
	@Autowired
	private SecurityService securityService;
	@Autowired
	private UserServices userSevices;
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(Model model, String error, String logout) {
        if (error != null)
            model.addAttribute("error", "Your username and password is invalid.");
        if (logout != null)
            model.addAttribute("message", "You have been logged out successfully.");
        return "user/login";
    }
	
	// Dang ky
	@RequestMapping("/dang-ky")
	public String register(){
		
		return "user/register";
	}
}
