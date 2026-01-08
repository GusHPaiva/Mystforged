package com.mystforged.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class InternalConflictException extends RuntimeException {
    public InternalConflictException(String message) {
        super(message);
    }
}
