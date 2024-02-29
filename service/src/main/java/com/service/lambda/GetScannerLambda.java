package com.service.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.service.activity.requests.GetScannerRequest;
import com.service.activity.results.GetScannerResult;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class GetScannerLambda extends LambdaActivityRunner<GetScannerRequest, GetScannerResult>
        implements RequestHandler<LambdaRequest<GetScannerRequest>, LambdaResponse> {
    private final Logger log = LogManager.getLogger();

    @Override
    public LambdaResponse handleRequest(LambdaRequest<GetScannerRequest> input, Context context) {
        log.info("handleRequest");
        return super.runActivity(
            () -> input.fromPath(path -> GetScannerRequest.builder()
                    .withScannerEmail(path.get("scannerEmail")).build()),
            (request, serviceComponent) ->
                    serviceComponent.provideGetScannerActivity().handleRequest(request)
        );
    }
}
