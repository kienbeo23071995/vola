import campaignApi from "apis/campaignApi";
import axios from "axios";
import HeaderPage from "page/components/HeaderPage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

function MediaVideo() {
    const params = useParams();
    const [videos, setVideos] = useState([]);
    const [campaign, setCampaign] = useState(null);
    useEffect(() => {
        (async () => {
            try {
                await axios.get("http://localhost:8080/getByIdCampagin/" + params.idcampaign).then((res) => {
                    const data = res.data.map((item) => ({
                        video: item.video
                    }))
                    setVideos(data);
                });
                ;
            } catch (error) {
                console.log('Failed to fetch event list:' + error);
            };
        })();
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const response = await campaignApi.listCampaign();
                setCampaign(response.find(n => n.campaignId == params.idcampaign).name);
            } catch (error) {
                console.log('Failed to fetch user list:' + error);
            }
        })();
    }, null)
    return (
        <div>
            <HeaderPage title={campaign} />
            <hr />
            {
                videos.map((value, index) => 
                    <div>
                        <video controls width="300">
                            <source src={value.video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )
            }
        </div>
    )
}

export default MediaVideo