package in.hms.backend.security;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
     // Secret key 
     
    @Value("${JWT_SECRET}")
    private String SECRET_KEY ;

    @Value("${JWT_EXPIRATION}")
    private Long jwtExpiration;

    // Generate signing key
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public Claims extractAllClaims(String token){
        return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
    }
    // Generate JWT Token
    public String generateToken(String email , String role){
        return Jwts.builder().setSubject(email).claim("role", role).setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis()+jwtExpiration)).signWith(getSigningKey(),SignatureAlgorithm.HS256).compact();
    }
    // Extract email from token
    public String extractEmail(String token){
        return extractAllClaims(token).getSubject();
    }
    // Extract role from token
    public String extractRole(String token){
        return extractAllClaims(token).get("role",String.class);
    }

    public boolean validateToken(String token) {
        try {
            extractAllClaims(token);
            return true;

        } catch (Exception e) {
            return false;
        }
    }
}
