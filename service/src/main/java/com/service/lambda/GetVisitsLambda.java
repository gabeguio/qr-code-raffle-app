package com.service.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.service.activity.requests.GetVisitsRequest;
import com.service.activity.results.GetVisitsResult;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class GetVisitsLambda extends LambdaActivityRunner<GetVisitsRequest, GetVisitsResult>
        implements RequestHandler<LambdaRequest<GetVisitsRequest>, LambdaResponse> {
    private final Logger log = LogManager.getLogger();

    @Override
    public LambdaResponse handleRequest(LambdaRequest<GetVisitsRequest> input, Context context) {
        log.info("handleRequest");
        return super.runActivity(
            () -> input.fromPath(path -> GetVisitsRequest.builder()
                    .withSponsorName(path.get("sponsorName")).build()),
            (request, serviceComponent) ->
                    serviceComponent.provideGetVisitsActivity().handleRequest(request)
        );
    }
}
