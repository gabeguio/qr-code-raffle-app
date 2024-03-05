package com.service.activity.results;

import com.service.models.VisitModel;

import java.util.ArrayList;
import java.util.List;

public class GetVisitsResult {
    private final List<VisitModel> visitList;

    private GetVisitsResult(List<VisitModel> visitList) {
        this.visitList = visitList;
    }

    public List<VisitModel> getVisitsList() {
        return new ArrayList<>(visitList);
    }

    @Override
    public String toString() {
        return "GetVisitResult{" +
                "visitList=" + visitList +
                '}';
    }

    //CHECKSTYLE:OFF:Builder
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private List<VisitModel> visitList;

        public Builder withVisits(List<VisitModel> visitList) {
            this.visitList = new ArrayList<>(visitList);
            return this;
        }

        public GetVisitsResult build() {
            return new GetVisitsResult(visitList);
        }
    }
}

