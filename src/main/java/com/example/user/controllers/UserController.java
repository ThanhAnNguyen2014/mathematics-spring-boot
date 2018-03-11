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
	public String register() {

		return "user/register";
	}

	@RequestMapping("/phep-cong-trong-pham-vi-10")
	public String phepcong() {

		return "user/toan-lop-1/phep-cong-trong-pham-vi-10";
	}
	
	@RequestMapping("/6-cong-voi-mot-so-6-cong-5")
	public String toanlop2() {

		return "user/toan-lop-2/6-cong-voi-mot-so-6-cong-5";
	}
	
	@RequestMapping("/bai-toan-lien-quan-den-rut-ve-don-vi")
	public String baitoanlienquan() {

		return "user/toan-lop-3/bai-toan-lien-quan-den-rut-ve-don-vi";
	}
	
	@RequestMapping("/bieu-do")
	public String bieudo() {

		return "user/toan-lop-4/bieu-do";
	}
	
	@RequestMapping("/bai-kiem-tra-chuong-1")
	public String baikiemtrachuong1() {

		return "user/toan-lop-5/bai-kiem-tra-chuong-1";
	}
	
	@RequestMapping("/toan-lop-5")
	public String toanlop5() {

		return "user/bai-giang/toan-lop-5";
	}
}
