import React, { useEffect, useState } from 'react';
import HeaderPage from "page/components/HeaderPage";
import { Container, Row, Table, Badge } from "react-bootstrap";
import campaignApi from "../../apis/campaignApi";

function Campaign() {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await campaignApi.listCampaign();
                // Filter campaigns with status === 1
                const filteredCampaigns = response.filter(campaign => campaign.status == 1);
                setCampaigns(filteredCampaigns);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
        };

        fetchCampaigns();
    }, []);

    return (
        <div>
            <HeaderPage title={"Chiến dịch"} />
            <section className="py-[60px]">
                <Container>
                    <Row>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>ID Chiến dịch</th>
                                    <th>Tên Chiến dịch</th>
                                    <th>Ngày bắt đầu</th>
                                    <th>Ngày kết thúc</th>
                                    <th>Mô tả</th>
                                    <th>Tiêu đề</th>
                                    <th>Địa điểm</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {campaigns.map((campaign, index) => (
                                    <tr key={campaign.campaignId}>
                                        <td>{campaign.campaignId}</td>
                                        <td>{campaign.name}</td>
                                        <td>{new Date(campaign.start_date).toLocaleDateString()}</td>
                                        <td>{new Date(campaign.end_date).toLocaleDateString()}</td>
                                        <td dangerouslySetInnerHTML={{ __html: campaign.description }}>{campaign.description}</td>
                                        <td>{campaign.title}</td>
                                        <td>{campaign.location}</td>
                                        <td>
                                            <Badge variant={campaign.statusId === 1 ? 'primary' : 'success'}>
                                                {campaign.statusName}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            </section>
            <hr />
        </div>
    );
}

export default Campaign;
