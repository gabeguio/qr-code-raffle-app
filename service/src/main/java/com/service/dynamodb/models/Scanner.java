package com.service.dynamodb.models;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

/**
 * Represents a record in the scanners table.
 */
@DynamoDBTable(tableName = "scanners")
public class Scanner {
    private String scannerEmail;
    private String sponsorName;

    @DynamoDBHashKey(attributeName = "scannerEmail")
    public String getScannerEmail() {
        return scannerEmail;
    }

    public void setScannerEmail(String scannerEmail) {
        this.scannerEmail = scannerEmail;
    }

    @DynamoDBRangeKey(attributeName = "sponsorName")
    public String getSponsorName() {
        return sponsorName;
    }

    public void setSponsorName(String sponsorName) {
        this.sponsorName = sponsorName;
    }

}
