package com.service.activity.requests;

public class GetScannerRequest {

    private final String scannerEmail;

    /**
     * Instantiates a new CreateVisitRequest object for the CreateVisitActivity.
     * @param scannerEmail sponsor name that is being visited.
     */

    private GetScannerRequest(String scannerEmail) {
        this.scannerEmail = scannerEmail;
    }

    public String getScannerEmail() {
        return scannerEmail;
    }

    @Override
    public String toString() {
        return "GetScannerRequest{" +
                "scannerEmail='" + scannerEmail + '\'' +
                '}';
    }

    //CHECKSTYLE:OFF:Builder
    public static Builder builder() {
        return new Builder();
    }

    //CHECKSTYLE:OFF:Builder
    public static class Builder {
        private String scannerEmail;

        public Builder withScannerEmail(String scannerEmail) {
            this.scannerEmail = scannerEmail;
            return this;
        }

        public GetScannerRequest build() {
            return new GetScannerRequest(scannerEmail);
        }
    }
}
