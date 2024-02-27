package com.service.activity;

import com.service.activity.requests.CreateVisitRequest;
import com.service.activity.results.CreateVisitResult;
import com.service.dynamodb.VisitDao;
import com.service.dynamodb.models.Visit;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.MockitoAnnotations.openMocks;

public class CreateVisitActivityTest {
    @Mock
    private VisitDao VisitDao;

    private CreateVisitActivity createVisitActivity;

    @BeforeEach
    void setUp() {
        openMocks(this);
        createVisitActivity = new CreateVisitActivity(VisitDao);
    }

    @Test
    public void handleRequest_withSponsorNameAndVisitorEmail_createsAndSavesVisit() {
        // GIVEN
        String expectedSponsorName = "company";
        String expectedVisitorEmail = "john@email.com";
        String expectedVisitorFullName = "John Doe";
        String expectedVisitorOrganization = "business";

        CreateVisitRequest request = CreateVisitRequest.builder()
                .withSponsorName(expectedSponsorName)
                .withVisitorEmail(expectedVisitorEmail)
                .withVisitorFullName(expectedVisitorFullName)
                .withVisitorOrganization(expectedVisitorOrganization)
                .build();

        // WHEN
        CreateVisitResult result = createVisitActivity.handleRequest(request);

        // THEN
        verify(VisitDao).saveVisit(any(Visit.class));

        assertNotNull(result.getVisit().getSponsorName());
        assertNotNull(result.getVisit().getVisitorEmail());
        assertEquals(expectedSponsorName, result.getVisit().getSponsorName());
        assertEquals(expectedVisitorEmail, result.getVisit().getVisitorEmail());
        assertEquals(expectedVisitorFullName, result.getVisit().getVisitorFullName());
        assertEquals(expectedVisitorOrganization, result.getVisit().getVisitorOrganization());

    }
}