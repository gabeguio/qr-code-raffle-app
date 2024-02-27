package com.service.dynamodb.models;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

/**
 * Represents a record in the visits table.
 */
@DynamoDBTable(tableName = "visits")
public class Visit {
    private String sponsorName;
    private String visitorEmail;
    private String visitorFullName;
    private String visitorOrganization;

    @DynamoDBHashKey(attributeName = "sponsorName")
    public String getSponsorName() {
        return sponsorName;
    }

    public void setSponsorName(String sponsorName) {
        this.sponsorName = sponsorName;
    }

    @DynamoDBRangeKey(attributeName = "visitorEmail")
    public String getVisitorEmail() {
        return visitorEmail;
    }

    public void setVisitorEmail(String visitorEmail) {
        this.visitorEmail = visitorEmail;
    }

    @DynamoDBAttribute(attributeName = "visitorFullName")
    public String getVisitorFullName() {
        return visitorFullName;
    }

    public void setVisitorFullName(String visitorFullName) {
        this.visitorFullName = visitorFullName;
    }

    @DynamoDBAttribute(attributeName = "visitorOrganization")
    public String getVisitorOrganization() {
        return visitorOrganization;
    }

    public void setVisitorOrganization(String visitorOrganization) {
        this.visitorOrganization = visitorOrganization;
    }
}

