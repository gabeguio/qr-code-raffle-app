package com.service.activity;

import com.service.activity.requests.GetScannerRequest;
import com.service.activity.results.GetScannerResult;
import com.service.dynamodb.ScannerDao;
import com.service.dynamodb.models.Scanner;

import com.service.exceptions.ScannerNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class GetScannerActivityTest {
    @Mock
    private ScannerDao scannerDao;

    private GetScannerActivity getScannerActivity;

    @BeforeEach
    public void setUp() {
        initMocks(this);
        getScannerActivity = new GetScannerActivity(scannerDao);
    }

    @Test
    public void handleRequest_savedScannerFound_returnsScannerModelInResult() {
        // GIVEN
        String expectedScannerEmail = "expectedScannerEmail";

        Scanner scanner = new Scanner();
        scanner.setScannerEmail(expectedScannerEmail);

        when(scannerDao.getScanner(expectedScannerEmail)).thenReturn(scanner);

        GetScannerRequest request = GetScannerRequest.builder()
                .withScannerEmail(expectedScannerEmail)
                .build();

        // WHEN
        GetScannerResult result = getScannerActivity.handleRequest(request);

        // THEN
        assertEquals(expectedScannerEmail, result.getScanner().getScannerEmail());
    }

    @Test
    public void handleRequest_noMatchingScannerEmail_throwsScannerNotFoundException() {
        // GIVEN
        String missingScannerEmail = "missingEmail";
        GetScannerRequest request = GetScannerRequest.builder()
                .withScannerEmail(missingScannerEmail)
                .build();

        // WHEN
        when(scannerDao.getScanner(missingScannerEmail)).thenThrow(new ScannerNotFoundException());

        // WHEN + THEN
        assertThrows(ScannerNotFoundException.class, () -> getScannerActivity.handleRequest(request));
    }
}