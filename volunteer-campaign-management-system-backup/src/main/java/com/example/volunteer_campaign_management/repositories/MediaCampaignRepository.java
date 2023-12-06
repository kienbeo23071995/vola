package com.example.volunteer_campaign_management.repositories;

import com.example.volunteer_campaign_management.entities.MediaCampaignEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MediaCampaignRepository extends JpaRepository<MediaCampaignEntity, Integer> {
    @Query(value = "select * from media where campaign_id = ?1", nativeQuery = true)
    List<MediaCampaignEntity> findByCampagin(int idCampagin);
    @Query(value = "select * from media where campaign_id = ?1 and  media_id = ?2", nativeQuery = true)
    MediaCampaignEntity findByCampaginAndMedia(int idCampagin, int idMedia);
}
