package com.service.activity.results;

import com.service.models.VisitModel;

public class CreateVisitResult {
    private final VisitModel visit;

    private CreateVisitResult(VisitModel visit) {
        this.visit = visit;
    }

    public VisitModel getVisit() {
        return visit;
    }

    @Override
    public String toString() {
        return "CreateVisitResult{" +
                "visit=" + visit +
                '}';
    }

    //CHECKSTYLE:OFF:Builder
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private VisitModel visit;

        public Builder withVisit(VisitModel visit) {
            this.visit = visit;
            return this;
        }

        public CreateVisitResult build() {
            return new CreateVisitResult(visit);
        }
    }
}

