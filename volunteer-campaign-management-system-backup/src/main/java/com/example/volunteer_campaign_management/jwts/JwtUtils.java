package com.example.volunteer_campaign_management.jwts;

import io.jsonwebtoken.*;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;


@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${jwtSecret}")
    private String jwtSecret;

    @Value("${jwtExpirationMs}")
    private int jwtExpirationMs;

    public String generateJwtToken(Authentication authentication) {
        Map<String, Object> claims = new HashMap<>();
        AccountDetails userPrincipal = (AccountDetails) authentication.getPrincipal();
        Collection<? extends GrantedAuthority> roles = userPrincipal.getAuthorities();
        if (roles.contains(new SimpleGrantedAuthority("Admin"))) {
            claims.put("isAdmin", true);
        }
        if (roles.contains(new SimpleGrantedAuthority("trưởng nhóm"))) {
            claims.put("isCaptain", true);
        }
        if (roles.contains(new SimpleGrantedAuthority("trưởng ban kế hoạch"))) {
            claims.put("isPlanner", true);
        }
        if(roles.contains(new SimpleGrantedAuthority("trưởng ban sự kiện"))) {
            claims.put("isEvent", true);
        }
        if(roles.contains(new SimpleGrantedAuthority("kế toán"))) {
            claims.put("isTreasure", true);
        }
        return Jwts.builder()
                .setSubject((userPrincipal.getEmail()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }

    public String getEmailFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    public List<SimpleGrantedAuthority> getRolesFromToken(String authToken) {
        List<SimpleGrantedAuthority> roles = null;
        Claims claims = Jwts.parser().setSigningKey(key()).parseClaimsJws(authToken).getBody();
        Boolean isAdmin = claims.get("isAdmin", Boolean.class);
        Boolean isCaptain = claims.get("isCaptain", Boolean.class);
        Boolean isPlanner = claims.get("isPlanner", Boolean.class);
        Boolean isEvent = claims.get("isEvent", Boolean.class);
        Boolean isTreasure = claims.get("isTreasure", Boolean.class);
        if (isAdmin != null && isAdmin == true) {
            roles = Arrays.asList(new SimpleGrantedAuthority("Admin"));
        }
        if (isCaptain != null && isCaptain == true) {
            roles = Arrays.asList(new SimpleGrantedAuthority("trưởng nhóm"));
        }
        if (isPlanner != null && isPlanner == true) {
            roles = Arrays.asList(new SimpleGrantedAuthority("trưởng ban kế hoạch"));
        }
        if (isEvent != null && isEvent == true) {
            roles = Arrays.asList(new SimpleGrantedAuthority("trưởng ban sự kiện"));
        }
        if (isTreasure != null && isTreasure == true) {
            roles = Arrays.asList(new SimpleGrantedAuthority("kế toán"));
        }
        return roles;
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

}
