package com.example.user.services;

public interface SecurityService {
	/*Thực hiện tìm log trong UserName*/
    String findLoggedInUsername();
    /*Thực hiện tự động login khi vẫn còn phiên làm việc*/
    void autologin(String username, String password);
}
