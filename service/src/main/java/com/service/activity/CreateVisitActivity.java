package com.service.activity;

import com.service.activity.requests.CreateVisitRequest;
import com.service.activity.results.CreateVisitResult;
import com.service.converters.ModelConverter;
import com.service.dynamodb.VisitDao;
import com.service.dynamodb.models.Visit;
import com.service.models.VisitModel;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.inject.Inject;

/**
 * Implementation of the CreateVisitActivity for the Qr Code Raffle Application's CreateVisit API.
 *
 * This API allows the scanner to create visit by providing the sponsor name they are
 * scanning for and the email of the visitor.
 */
public class CreateVisitActivity {
    private final Logger log = LogManager.getLogger();
    private final VisitDao visitDao;

    /**
     * Instantiates a new CreateVisitActivity object.
     *
     * @param VisitDao VisitDao to access the visits table.
     */
    @Inject
    public CreateVisitActivity(VisitDao VisitDao) {
        this.visitDao = VisitDao;
    }

    /**
     * This method handles the incoming request by persisting a new Visit
     * with the provided sponsor's name and visitor's email from the request.
     * additional information such as visitor's full name and organization is saved into the record.
     * <p>
     * It then returns the newly created Visit.
     * <p>
     *
     * @param createVisitRequest request object containing the sponsor name, visitor email,
     * visitor fullname, and visitor organization
     * @return createVisitResult result object containing the API defined {@link VisitModel}
     */
    public CreateVisitResult handleRequest(final CreateVisitRequest createVisitRequest) {
        Visit newVisit = new Visit();
        newVisit.setSponsorName(createVisitRequest.getSponsorName());
        newVisit.setVisitorEmail(createVisitRequest.getVisitorEmail());
        newVisit.setVisitorFullName(createVisitRequest.getVisitorFullName());
        newVisit.setVisitorOrganization(createVisitRequest.getVisitorOrganization());

        visitDao.saveVisit(newVisit);

        VisitModel visit = new ModelConverter().toVisitModel(newVisit);
        return CreateVisitResult.builder()
                .withVisit(visit)
                .build();
    }
}
