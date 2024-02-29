package com.service.activity.results;

import com.service.models.ScannerModel;

public class GetScannerResult {
    private final ScannerModel scanner;

    private GetScannerResult(ScannerModel scanner) {
        this.scanner = scanner;
    }

    public ScannerModel getScanner() {
        return scanner;
    }

    @Override
    public String toString() {
        return "GetScannerResult{" +
                "Scanner=" + scanner +
                '}';
    }

    //CHECKSTYLE:OFF:Builder
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private ScannerModel scanner;

        public Builder withScanner(ScannerModel scanner) {
            this.scanner = scanner;
            return this;
        }

        public GetScannerResult build() {
            return new GetScannerResult(scanner);
        }
    }
}

