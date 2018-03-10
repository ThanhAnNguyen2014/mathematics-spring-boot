package com.example.user.services;

import com.example.model.user.User;

public interface UserServices {
	
	void Save(User admin);

	User findUsername(String username);
}
