package com.service.converters;

import com.service.dynamodb.models.Scanner;
import com.service.models.ScannerModel;

/**
 * Converts between Data and API models.
 */

public class ModelConverter {
    /**
     * Converts a provided {@link Scanner} into a {@link ScannerModel} representation.
     *
     * @param scanner the scanner to convert
     * @return the converted scanner
     */
    public ScannerModel toScannerModel(Scanner scanner) {
        return ScannerModel.builder()
                .withScannerEmail(scanner.getScannerEmail())
                .withSponsorName(scanner.getSponsorName())
                .build();
    }
}
