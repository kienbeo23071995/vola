import campaignApi from "apis/campaignApi";
import axios from "axios";
import HeaderPage from "page/components/HeaderPage";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function MediaPage() {

    const [campaigns, setCampaigns] = useState([]);
    useEffect(() =>
    (async () => {
        try {
            const response = await campaignApi.listCampaign();
            setCampaigns(response);
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        }
    }), [])

    return (
        <div>
            <HeaderPage title={"THƯ VIỆN ẢNH"} />
            <hr />
            <div style={{textAlign:'center'}}>
                {
                    campaigns.map((report, index) => (
                        <div>
                            <h1>{report.name}</h1>
                            <div>
                                <Link to={`/mediaImage/${report.campaignId}`}>Khoảnh khoắc</Link>
                            </div>
                            <div>
                                <Link to={`/mediaVideo/${report.campaignId}`}>Thước phim</Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MediaPage;