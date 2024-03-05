package com.service.utils;

import com.service.models.VisitModel;

import java.util.*;

public class GrandPrizeProcessor {

    public Map<VisitModel, Set<String>> buildVisitSponsorMap(List<VisitModel> visits) {
        Map<VisitModel, Set<String>> visitSponsorMap = new HashMap<>();

        for (VisitModel visit : visits) {
            Set<String> sponsorNames = visitSponsorMap.computeIfAbsent(visit, k -> new HashSet<>());
            sponsorNames.add(visit.getSponsorName());
        }

        return visitSponsorMap;
    }

    public VisitModel getRandomWinner(Map<VisitModel, Set<String>> visitSponsorMap, int n) {
        List<VisitModel> eligibleWinners = new ArrayList<>();

        // Iterate through the map to find visitors with visit count >= n
        for (Map.Entry<VisitModel, Set<String>> entry : visitSponsorMap.entrySet()) {
            if (entry.getValue().size() >= n) {
                eligibleWinners.add(entry.getKey());
            }
        }

        // If there are eligible winners, return a random one
        if (!eligibleWinners.isEmpty()) {
            Random random = new Random();
            return eligibleWinners.get(random.nextInt(eligibleWinners.size()));
        } else {
            return null; // No eligible winners found
        }
    }
}


