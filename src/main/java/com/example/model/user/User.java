package com.example.model.user;

import java.util.Date;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.beans.factory.annotation.Value;

/**
 * @author ThuyTien
 *
 */
@Entity
@Table(name = "user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotNull
	private String username;
	@NotNull
	private String password;
	private String hoten;
	private Boolean gioitinh;
	private String sdtph;
	private String email;
	private String tinh;
	private String huyen;
	private String truong;
	private String lop;
	private Date ngaythamgia;
	@Value("true")
	private Boolean status;
	
	
	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public String getHoten() {
		return hoten;
	}

	public void setHoten(String hoten) {
		this.hoten = hoten;
	}

	public Boolean getGioitinh() {
		return gioitinh;
	}

	public void setGioitinh(Boolean gioitinh) {
		this.gioitinh = gioitinh;
	}

	public String getSdtph() {
		return sdtph;
	}

	public void setSdtph(String sdtph) {
		this.sdtph = sdtph;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTinh() {
		return tinh;
	}

	public void setTinh(String tinh) {
		this.tinh = tinh;
	}

	public String getHuyen() {
		return huyen;
	}

	public void setHuyen(String huyen) {
		this.huyen = huyen;
	}

	public String getTruong() {
		return truong;
	}

	public void setTruong(String truong) {
		this.truong = truong;
	}

	public String getLop() {
		return lop;
	}

	public void setLop(String lop) {
		this.lop = lop;
	}

	public Date getNgaythamgia() {
		return ngaythamgia;
	}

	public void setNgaythamgia(Date ngaythamgia) {
		this.ngaythamgia = ngaythamgia;
	}
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * User Constructor
	 * @param username
	 * @param password
	 * @param passwordConfirm
	 */
	public User(String username, String password) {
		this.username = username;
		this.password = password;
	}
	
	public User() {
		
	}

	public User(String hoten, Boolean gioitinh, String sdtph, String email, String tinh, String huyen, String truong,
			String lop, Date ngaythamgia) {
		super();
		this.hoten = hoten;
		this.gioitinh = gioitinh;
		this.sdtph = sdtph;
		this.email = email;
		this.tinh = tinh;
		this.huyen = huyen;
		this.truong = truong;
		this.lop = lop;
		this.ngaythamgia = ngaythamgia;
	}
}
