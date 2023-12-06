package com.example.volunteer_campaign_management.services;

import com.example.volunteer_campaign_management.dtos.GeneralReportDTO;
import com.example.volunteer_campaign_management.dtos.IssueDTO;

import java.util.List;
import java.util.Optional;

public interface GeneralReportService {
    GeneralReportDTO createNewGeneralReport(GeneralReportDTO generalReportDTO);
    GeneralReportDTO updateGeneralReport(GeneralReportDTO generalReportDTO);
    List<GeneralReportDTO> getAllGeneralReport();
    GeneralReportDTO getGeneralReportById(int generalReportId);
    GeneralReportDTO getGeneralReportByCampaign(int campaignId);
    List<GeneralReportDTO> searchGeneralReport(Optional<String> query);
}
