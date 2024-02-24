package com.service.models;

import java.util.Objects;

/**
 * Represents the scanner model object.
 */
public class ScannerModel {
    private final String scannerEmail;
    private final String sponsorName;

    /**
     * Instantiates a ScannerModel object.
     *
     * @param scannerEmail the users email to retrieve from the scanners table.
     * @param sponsorName the users designated sponsorName to retrieve from the scanners table.
     */
    public ScannerModel(String scannerEmail, String sponsorName) {
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
        return "ScannerModel{" +
                "scannerEmail='" + scannerEmail + '\'' +
                ", sponsorName='" + sponsorName + '\'' +
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
        ScannerModel that = (ScannerModel) o;
        return Objects.equals(scannerEmail, that.scannerEmail) && Objects.equals(sponsorName, that.sponsorName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(scannerEmail, sponsorName);
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

        public ScannerModel build() {
            return new ScannerModel(scannerEmail, sponsorName);
        }
    }
    //CHECKSTYLE:ON
}
