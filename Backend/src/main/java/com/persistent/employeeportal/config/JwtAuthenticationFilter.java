package com.persistent.employeeportal.config;

import java.io.IOException;

import com.persistent.employeeportal.entity.Token;
import com.persistent.employeeportal.exception.JwtWrongException;
import com.persistent.employeeportal.repository.ITokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@EnableMethodSecurity
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	@Autowired
	private JwtUtilities jwtUtilities;
	@Autowired
	private EmployeeUserDetailsService customerUserDetailsService;

	@Autowired
	private ITokenRepository iTokenRepository;

	public JwtAuthenticationFilter() {
	}

	public JwtAuthenticationFilter(JwtUtilities jwtUtilities, EmployeeUserDetailsService customerUserDetailsService) {
		this.jwtUtilities = jwtUtilities;
		this.customerUserDetailsService = customerUserDetailsService;
	}

	@Override
	protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
			@NonNull FilterChain filterChain) throws ServletException, IOException {

		final String requestTokenHeader = request.getHeader("Authorization");

		String email = null;
		String jwtToken = null;

		if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
			jwtToken = requestTokenHeader.substring(7);
			Token token  = iTokenRepository.findByToken(jwtToken);
			try {
				if(token == null)
					throw new JwtWrongException("JWT Token is Wrong");
				email = jwtUtilities.extractUsername(jwtToken);
//				request.setAttribute("userName", email);
				logger.error("UserName" + email);
			} catch (IllegalArgumentException e) {
				logger.error("Unable to get JWT Token");
			} catch (ExpiredJwtException e) {
				logger.error("JWT Token has expired");
			} catch (JwtWrongException e) {
				throw new RuntimeException(e);
			}
		} else {
			System.out.println("JWT token does not start with Bearer");
		}
		if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = customerUserDetailsService.loadUserByUsername(email);

			try {
				if (jwtUtilities.validateToken(jwtToken, userDetails)) {
					UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
							userDetails, null, userDetails.getAuthorities());
					usernamePasswordAuthenticationToken
							.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
					SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				}
			} catch (Exception e) {
				logger.error(e.getMessage());
			}
		}
		filterChain.doFilter(request, response);

	}

}
