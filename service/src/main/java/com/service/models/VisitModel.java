package com.service.models;

import java.util.Objects;

/**
 * Represents the visit model object.
 */
public class VisitModel {
    private final String sponsorName;
    private final String visitorEmail;
    private final String visitorFullName;
    private final String visitorOrganization;

    /**
     * Instantiates a VisitModel object.
     *
     * @param sponsorName the sponsor name currently assigned to the scanner to update the visit table.
     * @param visitorEmail the visitor email embedded in the qr code to update the visit table.
     * @param visitorFullName the visitor full name embedded in the qr code to update the visit table.
     * @param visitorOrganization the visitor organization name embedded in the qr code to update the visit table.
     */

    public VisitModel(String sponsorName, String visitorEmail, String visitorFullName, String visitorOrganization) {
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
        return "VisitModel{" +
                "sponsorName='" + sponsorName + '\'' +
                ", visitorEmail='" + visitorEmail + '\'' +
                ", visitorFullName='" + visitorFullName + '\'' +
                ", visitorOrganization='" + visitorOrganization + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        VisitModel that = (VisitModel) o;
        return Objects.equals(sponsorName, that.sponsorName) &&
                Objects.equals(visitorEmail, that.visitorEmail) &&
                Objects.equals(visitorFullName, that.visitorFullName) &&
                Objects.equals(visitorOrganization, that.visitorOrganization);
    }

    @Override
    public int hashCode() {
        return Objects.hash(sponsorName, visitorEmail, visitorFullName, visitorOrganization);
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

        public VisitModel build() {
            return new VisitModel(sponsorName, visitorEmail, visitorFullName, visitorOrganization);
        }
    }
    //CHECKSTYLE:ON
}

