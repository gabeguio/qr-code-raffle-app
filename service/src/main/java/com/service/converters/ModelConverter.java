package com.service.converters;

import com.service.dynamodb.models.Scanner;
import com.service.dynamodb.models.Visit;
import com.service.models.ScannerModel;
import com.service.models.VisitModel;

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

    /**
     * Converts a provided {@link Visit} into a {@link VisitModel} representation.
     *
     * @param visit the visit to convert
     * @return the converted visit
     */
    public VisitModel toVisitModel(Visit visit) {
        return VisitModel.builder()
                .withSponsorName(visit.getSponsorName())
                .withVisitorEmail(visit.getVisitorEmail())
                .withVisitorFullName(visit.getVisitorFullName())
                .withVisitorOrganization(visit.getVisitorOrganization())
                .build();
    }
}
