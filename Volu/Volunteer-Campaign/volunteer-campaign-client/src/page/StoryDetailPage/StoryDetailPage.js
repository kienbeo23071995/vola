import HeaderPage from "page/components/HeaderPage";
import React, { useEffect, useState } from "react";
import "./StoryDetailPage.css";
import { Row, Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";

function StoryDetailPage() {
  const { id } = useParams();
  const [story, setStory] = useState(null);

  useEffect(() => {
    async function fetchStory() {
      try {
        const response = await axios.get(
          `http://localhost:8080/volunteer-campaign-management/api/v1/story/${id}`
        );
        setStory(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchStory();
  }, []);

  return (
    <main className="story-page">
      <HeaderPage title={"Câu chuyện"} />
      <hr />
      {story && (
        <Row className="story-row" key={story.id}>
          <div className="story">
            <h4>{story.title}</h4>
            <div className="mb-2 text-muted" tag="h6">
              <FontAwesomeIcon icon={faCalendarAlt} /> {story.date}
            </div>
          </div>
          <img src={story.imageUrl} alt="" className="story-image" />
          <h1>{story.name}</h1>
          <div dangerouslySetInnerHTML={{__html: story.content}}></div>
        </Row>
      )}
    </main>
  );
}

export default StoryDetailPage;
