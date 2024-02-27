package com.service.activity.requests;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@JsonDeserialize(builder = CreateVisitRequest.Builder.class)
public class CreateVisitRequest {
    private final String sponsorName;
    private final String visitorEmail;
    private final String visitorFullName;
    private final String visitorOrganization;

    /**
     * Instantiates a new CreateVisitRequest object for the CreateVisitActivity.
     * @param sponsorName sponsor name that is being visited.
     * @param visitorEmail visitor email.
     * @param visitorFullName visitor first and last name.
     * @param visitorOrganization visitor organization signed up for the conference.
     */

    public CreateVisitRequest(String sponsorName, String visitorEmail,
                              String visitorFullName, String visitorOrganization) {
        this.sponsorName = sponsorName;
        this.visitorEmail = visitorEmail;
        this.visitorFullName = visitorFullName;
        this.visitorOrganization = visitorOrganization;
    }

    public String getSponsorName() {
        return sponsorName;
    }

    public String getVisitorEmail() {
        return visitorEmail;
    }

    public String getVisitorFullName() {
        return visitorFullName;
    }

    public String getVisitorOrganization() {
        return visitorOrganization;
    }

    @Override
    public String toString() {
        return "CreateVisitRequest{" +
                "sponsorName='" + sponsorName + '\'' +
                ", visitorEmail='" + visitorEmail + '\'' +
                ", visitorFullName='" + visitorFullName + '\'' +
                ", visitorOrganization='" + visitorOrganization + '\'' +
                '}';
    }

    //CHECKSTYLE:OFF:Builder
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private String sponsorName;
        private String visitorEmail;
        private String visitorFullName;
        private String visitorOrganization;


        public Builder withSponsorName(String sponsorName) {
            this.sponsorName = sponsorName;
            return this;
        }

        public Builder withVisitorEmail(String visitorEmail) {
            this.visitorEmail = visitorEmail;
            return this;
        }

        public Builder withVisitorFullName(String visitorFullName) {
            this.visitorFullName = visitorFullName;
            return this;
        }

        public Builder withVisitorOrganization(String visitorOrganization) {
            this.visitorOrganization = visitorOrganization;
            return this;
        }

        public CreateVisitRequest build() {
            return new CreateVisitRequest(sponsorName, visitorEmail, visitorFullName, visitorOrganization);
        }
    }
}

