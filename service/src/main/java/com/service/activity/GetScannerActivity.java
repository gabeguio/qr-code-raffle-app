package com.service.activity;

import com.service.activity.requests.GetScannerRequest;
import com.service.activity.results.GetScannerResult;

import com.service.converters.ModelConverter;

import com.service.dynamodb.ScannerDao;
import com.service.dynamodb.models.Scanner;
import com.service.models.ScannerModel;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.inject.Inject;

/**
 * Implementation of the GetScannerActivity for the GetScanner API.
 * This API allows the user to get their scanner profile.
 */
public class GetScannerActivity {
    private final Logger log = LogManager.getLogger();
    private final ScannerDao scannerDao;

    /**
     * Instantiates a new GetScannerActivity object.
     *
     * @param scannerDao scannerDao to access the Scanner table.
     */
    @Inject
    public GetScannerActivity(ScannerDao scannerDao) {
        this.scannerDao = scannerDao;
    }

    /**
     * This method handles the incoming request by retrieving the Scanner from the database.
     * <p>
     * It then returns the Scanner.
     * <p>
     * If the Scanner does not exist, this should throw a ScannerNotFoundException.
     *
     * @param getScannerRequest request object containing the Scanner's email
     * @return getScannerResult result object containing the API defined {@link ScannerModel}
     */
    public GetScannerResult handleRequest(final GetScannerRequest getScannerRequest) {
        log.info("Received GetScannerRequest {}", getScannerRequest);
        String userEmail = getScannerRequest.getScannerEmail();
        Scanner currentScanner = scannerDao.getScanner(userEmail);
        ScannerModel scanner = new ModelConverter().toScannerModel(currentScanner);

        return GetScannerResult.builder()
                .withScanner(scanner)
                .build();
    }
}
