package com.service.converters;

import com.service.dynamodb.models.Scanner;
import com.service.dynamodb.models.Visit;

import com.service.models.ScannerModel;
import com.service.models.VisitModel;

import java.util.ArrayList;
import java.util.List;

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

    /**
     * Converts a provided {@link visits} into a {@link List VisitModel } representation.
     *
     * @param visits the visits to convert to a list of visit models
     * @return the converted visit models list
     */
    public List<VisitModel> toVisitModelList(List<Visit> visits) {
        List<VisitModel> visitModelList = new ArrayList<>();

        for (int i = 0; i < visits.size(); i++) {
            visitModelList.add(toVisitModel(visits.get(i)));
        }

        return visitModelList;
    }
}
