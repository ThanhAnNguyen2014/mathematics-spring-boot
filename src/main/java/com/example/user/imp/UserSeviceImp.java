package com.example.user.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.model.user.User;
import com.example.user.repositories.UserRepo;
import com.example.user.services.UserServices;


@Service
public class UserSeviceImp implements UserServices {
	
	 /*Khai báo đối lớp UserRepo*/
    @Autowired
    private UserRepo userRepo;
    /*Khai báo lớp mã hóa password*/
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	public void Save(User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		userRepo.save(user);
	}
	// tim user trong bang user thong qua lop repo
	@Override
	public User findUsername(String username) {
		return userRepo.findByUsername(username);
	}

}
