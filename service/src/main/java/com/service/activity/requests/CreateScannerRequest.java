package com.service.activity.requests;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@JsonDeserialize(builder = CreateScannerRequest.Builder.class)
public class CreateScannerRequest {
    private final String scannerEmail;
    private final String sponsorName;

    private CreateScannerRequest(String scannerEmail, String sponsorName) {
        this.scannerEmail = scannerEmail;
        this.sponsorName = sponsorName;
    }

    public String getScannerEmail() {
        return scannerEmail;
    }

    public String getSponsorName() {
        return sponsorName;
    }

    @Override
    public String toString() {
        return "CreateScannerRequest{" +
                "scannerEmail='" + scannerEmail + '\'' +
                ", sponsorName='" + sponsorName + '\'' +
                '}';
    }

    //CHECKSTYLE:OFF:Builder
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private String scannerEmail;
        private String sponsorName;

        public Builder withScannerEmail(String scannerEmail) {
            this.scannerEmail = scannerEmail;
            return this;
        }

        public Builder withSponsorName(String sponsorName) {
            this.sponsorName = sponsorName;
            return this;
        }

        public CreateScannerRequest build() {
            return new CreateScannerRequest(scannerEmail, sponsorName);
        }
    }
}
