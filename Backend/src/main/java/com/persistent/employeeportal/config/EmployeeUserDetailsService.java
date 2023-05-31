package com.persistent.employeeportal.config;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.persistent.employeeportal.entity.EmployeeDetails;
import com.persistent.employeeportal.repository.IUserRepository;

import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor
public class EmployeeUserDetailsService implements UserDetailsService {
@Autowired
    private  IUserRepository iUserRepository ;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    	EmployeeDetails user = iUserRepository.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException("User not found !"));
        return  user ;

    }


}