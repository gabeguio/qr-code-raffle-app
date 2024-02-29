package com.service.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import com.service.activity.requests.CreateScannerRequest;
import com.service.activity.results.CreateScannerResult;


public class CreateScannerLambda
        extends LambdaActivityRunner<CreateScannerRequest, CreateScannerResult>
        implements RequestHandler<AuthenticatedLambdaRequest<CreateScannerRequest>, LambdaResponse> {
    @Override
    public LambdaResponse handleRequest(AuthenticatedLambdaRequest<CreateScannerRequest> input, Context context) {
        return super.runActivity(
            () -> {
                CreateScannerRequest unauthenticatedRequest = input.fromBody(CreateScannerRequest.class);
                return input.fromUserClaims(claims ->
                    CreateScannerRequest.builder()
                            .withScannerEmail(claims.get("email"))
                            .withSponsorName(unauthenticatedRequest.getSponsorName())
                            .build());
            },
            (request, serviceComponent) ->
                serviceComponent.provideCreateScannerActivity().handleRequest(request)
        );
    }
}

