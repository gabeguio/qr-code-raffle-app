package com.service.activity.results;

import com.service.models.ScannerModel;

public class CreateScannerResult {
    private final ScannerModel scanner;

    private CreateScannerResult(ScannerModel scanner) {
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

        public Builder withScanner(ScannerModel Scanner) {
            this.scanner = Scanner;
            return this;
        }

        public CreateScannerResult build() {
            return new CreateScannerResult(scanner);
        }
    }
}
