package com.service.dynamodb;

import com.service.dynamodb.models.Visit;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedQueryList;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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


    /**
     * Queries (gets) a list of visitors by the sponsor's name.
     *
     * @param sponsorName the sponsor name querying the visits table
     * @return visitList the list of all visitors for the provided sponsorName
     */
    public List<Visit> getVisitsBySponsorName(String sponsorName) {

        if (sponsorName == null) {
            throw new IllegalArgumentException("passed in sponsorName is null");
        }
        Map<String, AttributeValue> valueMap = new HashMap<>();
        valueMap.put(":sponsorName", new AttributeValue().withS(sponsorName));

        DynamoDBQueryExpression<Visit> queryExpression = new DynamoDBQueryExpression<Visit>()
                .withKeyConditionExpression("sponsorName = :sponsorName")
                .withExpressionAttributeValues(valueMap);

        PaginatedQueryList<Visit> visitList = dynamoDbMapper.query(Visit.class, queryExpression);

        if (visitList == null) {
            throw new RuntimeException("Visits not found for requested sponsorName");
        }

        return visitList;
    }


    /**
     * Saves (creates or updates) the given scanner.
     *
     * @param visit The scanner to save
     */
    public void saveVisit(Visit visit) {
        this.dynamoDbMapper.save(visit);
    }
}
