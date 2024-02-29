package com.service.activity;

import com.service.activity.requests.CreateScannerRequest;
import com.service.activity.results.CreateScannerResult;
import com.service.dynamodb.ScannerDao;
import com.service.dynamodb.models.Scanner;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.mockito.MockitoAnnotations.openMocks;

public class CreateScannerActivityTest {
    @Mock
    private ScannerDao ScannerDao;

    private CreateScannerActivity createScannerActivity;

    @BeforeEach
    void setUp() {
        openMocks(this);
        createScannerActivity = new CreateScannerActivity(ScannerDao);
    }

    @Test
    public void handleRequest_withScannerEmailAndSponsorName_createsAndSavesScanner() {
        // GIVEN
        String expectedScannerEmail = "john@email.com";
        String expectedSponsorName = "company";

        CreateScannerRequest request = CreateScannerRequest.builder()
                .withScannerEmail(expectedScannerEmail)
                .withSponsorName(expectedSponsorName)
                .build();

        // WHEN
        CreateScannerResult result = createScannerActivity.handleRequest(request);

        // THEN
        verify(ScannerDao).saveScanner(any(Scanner.class));

        assertNotNull(result.getScanner().getScannerEmail());
        assertEquals(expectedScannerEmail, result.getScanner().getScannerEmail());
        assertEquals(expectedSponsorName, result.getScanner().getSponsorName());
    }
}