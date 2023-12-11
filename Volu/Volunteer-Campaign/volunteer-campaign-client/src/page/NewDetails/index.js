import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import HeaderPage from "page/components/HeaderPage";
import { Container, Row, Col,Card } from "react-bootstrap";
import newsApi from '../../apis/newsApi';
import './New.css'; 

function NewDetails() {
    const { id } = useParams(); // Lấy id từ params
    const [news, setNews] = useState(null);

    useEffect(() => {
        const fetchNewsData = async () => {
            try {
                const response = await newsApi.getDetailNews(id); // Truyền id vào hàm
                setNews(response);
            } catch (error) {
                console.error('Error fetching news data:', error);
            }
        };

        fetchNewsData();
    }, [id]); // Đặt [id] làm dependency để useEffect chạy lại khi id thay đổi

    return (
        <div>
            <HeaderPage title={"Tin tức"} />
            <section className="py-[60px]">
                <Container>
                    <Row>
                        {news && (
                            <Col>
                                <Card>
                                    <Card.Img variant="top" src={news.image} />
                                    <Card.Body>
                                        <Card.Title>{news.title}</Card.Title>
                                        <Card.Text dangerouslySetInnerHTML={{__html: news.content}}></Card.Text>
                                        {/* Các thông tin khác của tin tức */}
                                    </Card.Body>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </Container>
            </section>
            <hr />
        </div>
    );
}

export default NewDetails;
