package com.service.activity.requests;

public class GetVisitsRequest {

    private final String sponsorName;

    /**
     * Instantiates a new GetVisitRequest object for the GetVisitActivity.
     * @param sponsorName sponsor name that has visitors.
     */

    private GetVisitsRequest(String sponsorName) {
        this.sponsorName = sponsorName;
    }

    public String getSponsorName() {
        return sponsorName;
    }

    @Override
    public String toString() {
        return "GetVisitsRequest{" +
                "sponsorName='" + sponsorName + '\'' +
                '}';
    }

    //CHECKSTYLE:OFF:Builder
    public static Builder builder() {
        return new Builder();
    }

    //CHECKSTYLE:OFF:Builder
    public static class Builder {
        private String sponsorName;

        public Builder withSponsorName(String sponsorName) {
            this.sponsorName = sponsorName;
            return this;
        }

        public GetVisitsRequest build() {
            return new GetVisitsRequest(sponsorName);
        }
    }
}
