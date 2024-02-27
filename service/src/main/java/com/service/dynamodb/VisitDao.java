package com.service.dynamodb;

import com.service.dynamodb.models.Visit;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;

import javax.inject.Inject;
import javax.inject.Singleton;

/**
 * Accesses data for a scanner using {@link Visit} to represent the model in DynamoDB.
 */
@Singleton
public class VisitDao {
    private final DynamoDBMapper dynamoDbMapper;
    /**
     * Instantiates a VisitDao object.
     *
     * @param dynamoDbMapper the {@link DynamoDBMapper} used to interact with the visits table.
     */
    @Inject
    public VisitDao(DynamoDBMapper dynamoDbMapper) {
        this.dynamoDbMapper = dynamoDbMapper;
    }

    //    /**
    //     * Returns the {@link Visit} corresponding to the specified sponsor name and visitor email.
    //     *
    //     * @param sponsorName the sponsor.
    //     * @param visitorEmail the visitor email.
    //     * @return the stored Visit, or null if none was found.
    //     */
    //    public Scanner getVisitorBySponsor(String sponsorName) {
    //        Scanner scanner = this.dynamoDbMapper.load(Scanner.class, scannerEmail, sponsorName);
    //
    //        if (scanner == null) {
    //            throw new ScannerNotFoundException("Could not find scanner with email " + scannerEmail +
    //                    " and sponsor name " + sponsorName);
    //        }
    //        return scanner;
    //    }

    /**
     * Saves (creates or updates) the given scanner.
     *
     * @param visit The scanner to save
     * @return The visit object that was saved
     */
    public Visit saveVisit(Visit visit) {
        this.dynamoDbMapper.save(visit);
        return visit;
    }
}
