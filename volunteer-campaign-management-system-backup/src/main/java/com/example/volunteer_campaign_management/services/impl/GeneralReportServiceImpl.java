package com.example.volunteer_campaign_management.services.impl;

import com.example.volunteer_campaign_management.dtos.GeneralReportDTO;
import com.example.volunteer_campaign_management.dtos.IssueDTO;
import com.example.volunteer_campaign_management.entities.CampaignEntity;
import com.example.volunteer_campaign_management.entities.CurrentStatusEntity;
import com.example.volunteer_campaign_management.entities.GeneralReportEntity;
import com.example.volunteer_campaign_management.entities.IssueEntity;
import com.example.volunteer_campaign_management.mappers.MapperUtil;
import com.example.volunteer_campaign_management.repositories.CampaignRepository;
import com.example.volunteer_campaign_management.repositories.CurrentStatusRepository;
import com.example.volunteer_campaign_management.repositories.GeneralReportRepository;
import com.example.volunteer_campaign_management.services.GeneralReportService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class GeneralReportServiceImpl implements GeneralReportService {
    private final GeneralReportRepository generalReportRepository;
    private final CampaignRepository campaignRepository;
    private final CurrentStatusRepository currentStatusRepository;
    private final MapperUtil mapperUtil;

    @Override
    public GeneralReportDTO createNewGeneralReport(GeneralReportDTO generalReportDTO) {
        try {
            GeneralReportEntity generalReportEntity = new GeneralReportEntity();
            generalReportEntity.setGeneralReportId(generalReportDTO.getGeneralReportId());
            generalReportEntity.setAttachment(generalReportDTO.getAttachment());
            generalReportEntity.setCreated_at(generalReportDTO.getCreated_at());

            CampaignEntity campaignEntity = campaignRepository.findById(generalReportDTO.getCampaignId())
                    .orElseThrow(() -> new EntityNotFoundException("Campaign not found"));

            CurrentStatusEntity currentStatusEntity = currentStatusRepository.findById(generalReportDTO.getStatusId())
                    .orElseThrow(() -> new EntityNotFoundException("Campaign not found"));

            generalReportEntity.setCampaignEntity(campaignEntity);
            generalReportEntity.setCurrentStatusEntity(currentStatusEntity);

            // In các giá trị ra console
            System.out.println("GeneralReportId: " + generalReportEntity.getGeneralReportId());
            System.out.println("Attachment: " + generalReportEntity.getAttachment());
            System.out.println("Created_at: " + generalReportEntity.getCreated_at());
            System.out.println("CampaignId: " + generalReportEntity.getCampaignEntity().getCampaignId());
            System.out.println("CurrentStatusId: " + generalReportEntity.getCurrentStatusEntity().getStatusId());


            generalReportRepository.save(generalReportEntity);
            return generalReportDTO;
        } catch (Exception e) {
            e.printStackTrace(); // Print the actual exception for debugging
            return null;
        }
    }

    @Override
    public GeneralReportDTO updateGeneralReport(GeneralReportDTO generalReportDTO) {
        try {
            GeneralReportEntity generalReportEntity = generalReportRepository.getOne(generalReportDTO.getGeneralReportId());

            generalReportEntity.setAttachment(generalReportDTO.getAttachment());
            generalReportEntity.setCreated_at(generalReportDTO.getCreated_at());

            generalReportRepository.save(generalReportEntity);

            return generalReportDTO;
        } catch (Exception e) {
            e.printStackTrace(); // In lỗi để kiểm tra
            return null;
        }
    }


    @Override
    public List<GeneralReportDTO> getAllGeneralReport() {
        try {
            List<GeneralReportEntity> generalReportEntities = generalReportRepository.findAll();
            List<GeneralReportDTO> generalReportDTOS = mapperUtil.mapToListGeneralReportDTO(generalReportEntities);
            return generalReportDTOS;
        } catch (Exception e) {
            e.getMessage();
            return null;
        }
    }

    @Override
    public GeneralReportDTO getGeneralReportById(int generalReportId) {
        try{
            GeneralReportEntity generalReportEntity = generalReportRepository.findById(generalReportId).get();
            GeneralReportDTO generalReportDTO = new GeneralReportDTO();
            generalReportDTO.setAttachment(generalReportEntity.getAttachment());
            generalReportDTO.setCreated_at(generalReportEntity.getCreated_at());
            generalReportDTO.setCampaignId(generalReportEntity.getCampaignEntity().getCampaignId());
            generalReportDTO.setCampaignName(generalReportEntity.getCampaignEntity().getName());
            generalReportDTO.setStatusId(generalReportEntity.getCurrentStatusEntity().getStatusId());
            generalReportDTO.setStatusName(generalReportEntity.getCurrentStatusEntity().getName());
            generalReportDTO.setGeneralReportId(generalReportId);
            return generalReportDTO;
        } catch (Exception e){
            e.getMessage();
            return null;
        }
    }
    @Override
    public GeneralReportDTO getGeneralReportByCampaign(int campaignId) {
        return null;
    }

    @Override
    public List<GeneralReportDTO> searchGeneralReport(Optional<String> query) {

        List<GeneralReportEntity> GeneralReportDTOS = new ArrayList<>();
        try{
            if (!query.isPresent()) {
                return getAllGeneralReport();
            }
            else {
                GeneralReportDTOS = generalReportRepository.findByAttachmentContainingIgnoreCase(query);

            }
        } catch (Exception e) {
            e.getMessage();
        }
        return mapperUtil.mapToListGeneralReportDTO(GeneralReportDTOS);
    }
}
