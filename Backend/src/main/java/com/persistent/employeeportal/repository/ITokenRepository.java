package com.persistent.employeeportal.repository;

import com.persistent.employeeportal.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITokenRepository extends JpaRepository<Token,Long> {
    void deleteByEmpEmail(String email);
    Token findByToken(String email);
}
