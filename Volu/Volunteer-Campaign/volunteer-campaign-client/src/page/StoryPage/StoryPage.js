import React, { useEffect, useState } from "react";
import { arrow_right_black_icon, news_img_1 } from "assets/img";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./StoryPage.css";
import HeaderPage from "page/components/HeaderPage";
import PaginationComponent from "page/Paging/PaginationComponent";

const StoryPage = () => {
  const [story, setStory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    async function fetchStory() {
      try {
        const response = await axios.get(
          "http://localhost:8080/volunteer-campaign-management/api/v1/story"
        );
        setStory(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchStory();
  }, []);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStories = story.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(story.length / itemsPerPage);

  return (
    <main className="story-grid">
      <HeaderPage title={"Câu chuyện"} />
      <hr />

      <section className="news py-[36px]">
        <Container>
          <Row>
            <Col lg={12}>
              <div>
                <h2 className="font-['Calistoga'] text-[45px] text-text-color-title text-center mb-[24px]">
                  CÂU CHUYỆN
                </h2>
              </div>
            </Col>

            {currentStories.map((story) => (
              <Col lg={6} key={story.id}>
                <div className="">
                  <div>
                    <div className="flex mb-[30px] bg-color-item-news">
                      <img
                        src={story.image}
                        alt=""
                        style={{ width: "250px", height: "auto" }}
                      />
                      <div className="p-[10px] flex flex-column w-full">
                        <h2 className="font-['Calistoga'] text-[26px] mb-[12px]">
                          {story.title}
                        </h2>
                        <div className="mb-2 text-muted" tag="h6">
                          <FontAwesomeIcon icon={faCalendarAlt} /> {story.date}
                        </div>
                        <p className="text-[15px]">{story.content}</p>
                        <Link
                          to={`#`}
                          className="flex items-center text-[15px] mt-auto"
                          style={{ color: "blue" }}
                        >
                          Đọc tiếp
                          <img
                            className="ml-[4px]"
                            src={arrow_right_black_icon}
                            alt=""
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <div className="storry-page__pagination">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
};

export default StoryPage;
