package com.example.volunteer_campaign_management.repositories;

import com.example.volunteer_campaign_management.entities.IssueEntity;
import com.example.volunteer_campaign_management.entities.CampaignEntity;
import com.example.volunteer_campaign_management.entities.RequestVolunteerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface RequestVolunteerRepository extends JpaRepository<RequestVolunteerEntity,Integer> {
    List<RequestVolunteerEntity> findByNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrAddressContainingIgnoreCase(Optional<String> query1, Optional<String> query2, Optional<String> query3);


    List<RequestVolunteerEntity> findByNameContainsIgnoreCaseOrEmailContainingIgnoreCaseOrPhoneContainingIgnoreCaseOrAddressContainsIgnoreCaseOrDepartmentRequestContainsIgnoreCaseOrTimeFreeContainsIgnoreCase(
            Optional<String> query,Optional<String> query1,Optional<String> query2,Optional<String> query3,Optional<String> query5,Optional<String> query6
    );

    Collection<? extends RequestVolunteerEntity> findByCampaignEntity(CampaignEntity campaignEntity);
}

