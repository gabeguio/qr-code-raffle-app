package com.service.activity;

import com.service.activity.requests.CreateScannerRequest;
import com.service.activity.results.CreateScannerResult;

import com.service.converters.ModelConverter;

import com.service.dynamodb.ScannerDao;
import com.service.dynamodb.models.Scanner;

import com.service.models.ScannerModel;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.inject.Inject;

/**
 * Implementation of the CreateScannerActivity for the Qr Code Raffle Application's CreateScanner API.
 *
 * This API allows the user to create a scanner profile if they haven't already done so.
 */
public class CreateScannerActivity {
    private final Logger log = LogManager.getLogger();
    private final ScannerDao scannerDao;

    /**
     * Instantiates a new CreateScannerActivity object.
     *
     * @param scannerDao ScannerDao to access the scanners table.
     */
    @Inject
    public CreateScannerActivity(ScannerDao scannerDao) {
        this.scannerDao = scannerDao;
    }

    /**
     * This method handles the incoming request by persisting a new scanner
     * with the provided scanner's email and sponsor name from the request.
     * <p>
     * It then returns the newly created scanner.
     * <p>
     *
     * @param createScannerRequest request object containing the scanner's email and sponsor name
     *                              associated with it
     * @return createScannerResult result object containing the API defined {@link ScannerModel}
     */
    public CreateScannerResult handleRequest(final CreateScannerRequest createScannerRequest) {
        Scanner newScanner = new Scanner();
        newScanner.setScannerEmail(createScannerRequest.getScannerEmail());
        newScanner.setSponsorName(createScannerRequest.getSponsorName());

        scannerDao.saveScanner(newScanner);

        ScannerModel scannerModel = new ModelConverter().toScannerModel(newScanner);
        return CreateScannerResult.builder()
                .withScanner(scannerModel)
                .build();
    }
}
