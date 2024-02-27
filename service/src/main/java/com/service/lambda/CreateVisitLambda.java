package com.service.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.service.activity.requests.CreateVisitRequest;
import com.service.activity.results.CreateVisitResult;

public class CreateVisitLambda
        extends LambdaActivityRunner<CreateVisitRequest, CreateVisitResult>
        implements RequestHandler<AuthenticatedLambdaRequest<CreateVisitRequest>, LambdaResponse> {
    @Override
    public LambdaResponse handleRequest(AuthenticatedLambdaRequest<CreateVisitRequest> input, Context context) {
        return super.runActivity(
            () -> {
                CreateVisitRequest unauthenticatedRequest = input.fromBody(CreateVisitRequest.class);
                return input.fromUserClaims(claims ->
                    CreateVisitRequest.builder()
                            .withSponsorName(unauthenticatedRequest.getSponsorName())
                            .withVisitorEmail(unauthenticatedRequest.getVisitorEmail())
                            .withVisitorFullName(unauthenticatedRequest.getVisitorFullName())
                            .withVisitorOrganization(unauthenticatedRequest.getVisitorOrganization())
                            .build());
            },
            (request, serviceComponent) ->
                    serviceComponent.provideCreateVisitActivity().handleRequest(request)
    );
    }
}




