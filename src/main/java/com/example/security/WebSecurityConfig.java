package com.example.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.example.model.user.User;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	/*Khai báo đối tượng userService*/
    @Autowired
    private UserDetailsService userDetailsService;
    /*Khởi tạo đối tượng mã hóa password*/
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }
    /*Khởi tạo Token*/
    private CsrfTokenRepository csrfTokenRepository()
    {
        HttpSessionCsrfTokenRepository repository=new HttpSessionCsrfTokenRepository();
        repository.setSessionAttributeName("_csrf");
        return repository;
    }
    /*Cấu hình các phương thúc bảo mật cho các request từ người dùng.*/
    @Override
    protected void configure(HttpSecurity http) throws Exception{
    	http.
		authorizeRequests()
			.antMatchers("/resources/**", "/static/**", "/assets/**").permitAll()
			.antMatchers("/","/login", "/dang-ky","/phep-cong-trong-pham-vi-10/**","/6-cong-voi-mot-so-6-cong-5/**","/bai-toan-lien-quan-den-rut-ve-don-vi/**",
					"/bieu-do/**","/bai-kiem-tra-chuong-1/**","/toan-lop-5/**","/user/**").permitAll().anyRequest()
			//.antMatchers("/registration").permitAll()
			//.antMatchers("/admin/**").hasAuthority("ADMIN").anyRequest()
			.authenticated()
			.and()
			.csrf().disable()
			.formLogin()
			.loginPage("/login").failureUrl("/login?error=true")
			.defaultSuccessUrl("/")
			.and().logout()
			.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
			.logoutSuccessUrl("/").and().exceptionHandling()
			.accessDeniedPage("/access-denied");
    }
    /*Mã hóa password*/
    @Autowired
    public void ConfigureGlobal(AuthenticationManagerBuilder auth) throws Exception
    {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
    }
//    
    @Override
	public void configure(WebSecurity web) throws Exception {
	    web
	       .ignoring()
	       .antMatchers("/resources/**", "/static/**", "/assets/**","/css/**", "/js/**", "/images/**");
	}

}
