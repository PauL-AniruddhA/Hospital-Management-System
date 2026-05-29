package in.hms.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import in.hms.backend.security.JwtFilter;

@Configuration // Tells Spring that this class contains configuration beans.
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> {})
            .csrf(csrf -> csrf.disable()) // Since sessions/cookes based login not done
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Spring should NOT create HTTP sessions.
            .authorizeHttpRequests(auth -> auth
                    // Public APIs
                    .requestMatchers
                        (
                            HttpMethod.POST, 
                                "/api/auth/signup", 
                                "/api/auth/login",
                                "/api/auth/staff/signup"
                        ).permitAll()
                     // Doctor APIs
                    .requestMatchers("/api/doctor/**")
                    .hasRole("DOCTOR")

                    // Patient APIs
                    .requestMatchers("/api/patient/**")
                    .hasRole("PATIENT")

                    // Receptionist APIs
                    .requestMatchers("/api/receptionist/**")
                    .hasRole("RECEPTIONIST")
                        
                    .anyRequest().authenticated()) //. ANY REQUEST THEN AUTHENTICATE
                    
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class); // Run JwtFilter BEFORE Spring authentication.

        return http.build();
    }
}
