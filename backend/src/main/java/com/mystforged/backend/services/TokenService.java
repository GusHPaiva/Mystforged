package com.mystforged.backend.services;


import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.mystforged.backend.models.User;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.auth0.jwt.algorithms.Algorithm;

import java.time.Instant;
import java.util.Date;

@Service
public class TokenService {
    @Value("${jwt.secret}")
    private String secret;

    public String generateToken(User user) {

        try{

            Algorithm algorithm = Algorithm.HMAC256(secret);
            Date expireDate = Date.from(Instant.now().plusSeconds(360000));
            return JWT.create().withIssuer("mystforged")
                    .withSubject(user.getId().toString())
                    .withExpiresAt(expireDate)
                    .sign(algorithm);
        }catch(JWTCreationException e){
            throw new RuntimeException("Fail to generate token",e);
        }

    }
    public String verifyToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("mystforged")
                    .build()
                    .verify(token)
                    .getSubject();
        }
        catch(JWTVerificationException e){
            return "";
        }
    }
}
