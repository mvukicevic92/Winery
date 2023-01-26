package Project.winery.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import Project.winery.model.Korisnik;
import Project.winery.service.KorisnikService;

@Service
@Primary
public class UserDetailsServiceImpl implements UserDetailsService{
	
	@Autowired
	private KorisnikService korisnikService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	    Korisnik korisnik = korisnikService.findbyKorisnickoIme(username).orElse(null);

	    if (korisnik == null) {
	      throw new UsernameNotFoundException(String.format("No user found with username '%s'.", username));
	    } else {
	        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();

	        String role = korisnik.getUloga().toString();
	        grantedAuthorities.add(new SimpleGrantedAuthority(role));

	        return new org.springframework.security.core.userdetails.User(
	                korisnik.getKorisnickoIme().trim(),
	                korisnik.getLozinka().trim(),
	                grantedAuthorities);
	    }
	}


}
