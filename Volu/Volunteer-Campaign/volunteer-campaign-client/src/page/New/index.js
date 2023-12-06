import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderPage from "page/components/HeaderPage";
import { Container, Row, Card, Col, Button } from "react-bootstrap";
import newsApi from '../../apis/newsApi';
import { arrow_right_black_icon } from "assets/img"; 
import './New.css'; 

function New() {
    const [newsList, setNewsList] = useState([]);

    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                const response = await newsApi.listNews();
                setNewsList(response);
            } catch (error) {
                console.error('Error fetching news data:', error);
            }
        };

        fetchNewsData();
    }, []);

    return (
        <div>
            <HeaderPage title={"Tin tức"} />
            <section className="py-[60px]">
                <Container>
                    <Row>
                        {newsList.map(newsItem => (
                            <Col key={newsItem.newId} md={4}>
                                <Card className="custom-card">
                                    <Card.Body>
                                        <Card.Title>{newsItem.title}</Card.Title>
                                        <Card.Text>{newsItem.content}</Card.Text>
                                        <Link
                                            className="flex items-center text-[15px] mt-[15px]"
                                            to={`/news-details/${newsItem.newId}`}
                                        >
                                            Xem thêm{" "}
                                            <img className="ml-[4px]" src={arrow_right_black_icon} alt="" />
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
            <hr />
        </div>
    );
}

export default New;
