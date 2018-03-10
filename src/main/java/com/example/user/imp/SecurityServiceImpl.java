package com.example.user.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import com.example.user.services.SecurityService;

@Service
public class SecurityServiceImpl implements SecurityService {

	 /*Khởi tạo authentication từ thư viện hỗ trợ của spring framework*/
    private AuthenticationManager authenticationManager;
    /*Khởi tạo lớp UserDetails được hỗ trợ từ thư viện của spring framework*/
    @Autowired
    private UserDetailsService userDetailsService;

    /*Nhận thông tin logged trong chi tiết của người dùng thông qua authentication*/
    @Override
    public String findLoggedInUsername() {
        Object userDetails=SecurityContextHolder.getContext().getAuthentication().getDetails();
        if (userDetails instanceof UserDetails){
            return ((UserDetails)userDetails).getUsername();
        }
        return null;
    }
    /*Tự động nhận thông tin token của người dùng khi còn phiên đăng nhập và thực hiện đăng nhập tự động*/
    @Override
    public void autologin(String username, String password) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken= new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
        authenticationManager.authenticate(usernamePasswordAuthenticationToken);
        if(usernamePasswordAuthenticationToken.isAuthenticated())
        {
            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        }
    }

}
