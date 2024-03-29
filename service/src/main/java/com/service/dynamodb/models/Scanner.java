package com.service.dynamodb.models;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

/**
 * Represents a record in the scanners table.
 */
@DynamoDBTable(tableName = "Scanners")
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

    @DynamoDBAttribute(attributeName = "sponsorName")
    public String getSponsorName() {
        return sponsorName;
    }

    public void setSponsorName(String sponsorName) {
        this.sponsorName = sponsorName;
    }

}
