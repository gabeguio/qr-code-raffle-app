package com.service.dynamodb;

import com.service.dynamodb.models.Scanner;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.service.exceptions.ScannerNotFoundException;

import javax.inject.Inject;
import javax.inject.Singleton;

/**
 * Accesses data for a scanner using {@link Scanner} to represent the model in DynamoDB.
 */
@Singleton
public class ScannerDao {
    private final DynamoDBMapper dynamoDbMapper;
    /**
     * Instantiates a ScannerDao object.
     *
     * @param dynamoDbMapper the {@link DynamoDBMapper} used to interact with the scanners table.
     */
    @Inject
    public ScannerDao(DynamoDBMapper dynamoDbMapper) {
        this.dynamoDbMapper = dynamoDbMapper;
    }

    /**
     * Returns the {@link Scanner} corresponding to the specified email and sponsor.
     *
     * @param scannerEmail the Scanner Email.
     * @param sponsorName the Sponsor Name.
     * @return the stored Playlist, or null if none was found.
     */
    public Scanner getScanner(String scannerEmail, String sponsorName) {
        Scanner scanner = this.dynamoDbMapper.load(Scanner.class, scannerEmail, sponsorName);

        if (scanner == null) {
            throw new ScannerNotFoundException("Could not find scanner with email " + scannerEmail +
                    " and sponsor name " + sponsorName);
        }
        return scanner;
    }

    /**
     * Saves (creates or updates) the given scanner.
     *
     * @param scanner The scanner to save
     * @return The Scanner object that was saved
     */
    public Scanner saveScanner(Scanner scanner) {
        this.dynamoDbMapper.save(scanner);
        return scanner;
    }
}
