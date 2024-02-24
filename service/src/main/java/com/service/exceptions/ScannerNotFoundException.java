package com.service.exceptions;

/**
 * Exception to throw when a given Scanner email and sponsor name is not found in the database.
 */
public class ScannerNotFoundException extends RuntimeException {

    private static final long serialVersionUID = -912326717789387971L;

    /**
     * Exception with no message or cause.
     */
    public ScannerNotFoundException() {
        super();
    }

    /**
     * Exception with a message, but no cause.
     * @param message A descriptive message for this exception.
     */
    public ScannerNotFoundException(String message) {
        super(message);
    }

    /**
     * Exception with no message, but with a cause.
     * @param cause The original throwable resulting in this exception.
     */
    public ScannerNotFoundException(Throwable cause) {
        super(cause);
    }

    /**
     * Exception with message and cause.
     * @param message A descriptive message for this exception.
     * @param cause The original throwable resulting in this exception.
     */
    public ScannerNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
