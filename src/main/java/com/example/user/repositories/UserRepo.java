package com.example.user.repositories;
import com.example.model.user.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("userRepository")
public interface UserRepo extends JpaRepository<User, Long> {
	 /*Tìm username trên đối tượng model User*/
    User findByUsername(String username);
}
