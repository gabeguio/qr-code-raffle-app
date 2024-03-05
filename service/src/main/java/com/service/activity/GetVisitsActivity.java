package com.service.activity;

import com.service.activity.requests.GetVisitsRequest;
import com.service.activity.results.GetVisitsResult;

import com.service.converters.ModelConverter;

import com.service.dynamodb.VisitDao;
import com.service.dynamodb.models.Visit;
import com.service.models.VisitModel;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.List;

import javax.inject.Inject;

/**
 * Implementation of the GetVisitsActivity for the GetVisits API.
 * This API allows the user to get their all a sponsor's current visitors.
 */
public class GetVisitsActivity {
    private final Logger log = LogManager.getLogger();
    private final VisitDao visitDao;

    /**
     * Instantiates a new GetVisitsActivity object.
     *
     * @param visitDao visitsDao to access the Visits table.
     */
    @Inject
    public GetVisitsActivity(VisitDao visitDao) {
        this.visitDao = visitDao;
    }

    /**
     * This method handles the incoming request by retrieving the Visits from the database.
     * <p>
     * It then returns the Visits.
     * @param getVisitsRequest request object containing the sponsorName
     * @return getVisitsResult result object containing the API defined list of {@link VisitModel}
     */
    public GetVisitsResult handleRequest(final GetVisitsRequest getVisitsRequest) {
        log.info("Received GetVisitsRequest {}", getVisitsRequest);
        String sponsorName = getVisitsRequest.getSponsorName();

        List<Visit> visits = visitDao.getVisitsBySponsorName(sponsorName);
        List<VisitModel> visitList = new ModelConverter().toVisitModelList(visits);

        return GetVisitsResult.builder()
                .withVisits(visitList)
                .build();
    }
}
