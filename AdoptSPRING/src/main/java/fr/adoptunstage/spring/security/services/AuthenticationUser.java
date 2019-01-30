package fr.adoptunstage.spring.security.services;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationUser {
	
	public boolean isValidate(String username){
		
		Authentication loggedUser = SecurityContextHolder.getContext().getAuthentication();
		String loggedUserName = loggedUser.getName();
		String role = "";
		
		Set<String> authorities = loggedUser.getAuthorities()
				.stream()
				.map(a -> a.getAuthority())
				.collect(Collectors.toSet());
		
		for (String authoritie : authorities) {
			role = authoritie;
		}
		
		if (loggedUserName.equals(username) || role.equals("ROLE_ADMIN")) {
			 return true;
		}
		
		return false;
	}



}