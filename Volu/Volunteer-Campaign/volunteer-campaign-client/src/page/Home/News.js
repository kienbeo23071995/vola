import React, { useEffect, useState } from 'react';

import { arrow_right_black_icon, calendar_icon, news_img_1, news_img_2 } from "assets/img";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import newsApi from 'apis/newsApi';

function News() {
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

    const formatDate = (date) => {
        const formattedDate = new Date(date);
        const day = formattedDate.getDate();
        const month = formattedDate.getMonth() + 1; // Tháng bắt đầu từ 0
        const year = formattedDate.getFullYear();

        return `${day}-${month}-${year}`;
    };

    return (
        <section className="news py-[36px]">
            <Container>
                <Row>
                    <Col lg={12}>
                        <div>
                            <h2 className="font-['Calistoga'] text-[45px] text-text-color-title text-center mb-[24px]">TIN TỨC</h2>
                        </div>
                    </Col>
                    <Col lg={5}>
                        <div className="flex justify-end">
                            <div className="flex bg-color-item-news flex-column w-[70%]">
                                <img src={news_img_2} alt="" />
                                <div className="p-[10px] flex flex-column w-full">
                                    <h2 className="font-['Calistoga'] text-[26px] mb-[12px]">{newsList[0]?.title}</h2>
                                    <p className="text-[15px]">{newsList[0]?.content}</p>
                                    <Link
                                        className="flex items-center text-[15px] mt-[15px]"
                                        to={`/news-details/${newsList[0]?.newId}`}
                                    >
                                        Xem thêm{" "}
                                        <img className="ml-[4px]" src={arrow_right_black_icon} alt="" />
                                    </Link>
                                    <hr className="mt-[14px]"></hr>
                                    <p className="flex items-center mt-[10px]">
                                        <img className="mr-[4px]" src={calendar_icon} alt="" />
                                        <span>{formatDate(newsList[0]?.created_at)}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="">
                            <div>
                                {newsList[1]?.content ?
                                    <div className="flex mb-[30px] bg-color-item-news">
                                        <img src={news_img_1} alt="" />
                                        <div className="p-[10px] flex flex-column w-full">
                                            <h2 className="font-['Calistoga'] text-[26px] mb-[12px]">{newsList[1]?.title}</h2>
                                            <p className="text-[15px]">{newsList[1]?.content}</p>
                                            <Link
                                                className="flex items-center text-[15px] mt-[15px]"
                                                to={`/news-details/${newsList[1]?.newId}`}
                                            >
                                                Xem thêm{" "}
                                                <img className="ml-[4px]" src={arrow_right_black_icon} alt="" />
                                            </Link>
                                        </div>
                                    </div> : null}
                                {newsList[2]?.content ?

                                    <div className="flex mb-[30px] bg-color-item-news">
                                        <img src={news_img_1} alt="" />
                                        <div className="p-[10px] flex flex-column w-full">
                                            <h2 className="font-['Calistoga'] text-[26px] mb-[12px]">{newsList[2]?.title}</h2>
                                            <p className="text-[15px]">{newsList[2]?.content}</p>
                                            <Link
                                                className="flex items-center text-[15px] mt-[15px]"
                                                to={`/news-details/${newsList[2]?.newId}`}
                                            >
                                                Xem thêm{" "}
                                                <img className="ml-[4px]" src={arrow_right_black_icon} alt="" />
                                            </Link>
                                        </div>
                                    </div> : null}
                                {newsList[3]?.content ?

                                    <div className="flex mb-[30px] bg-color-item-news">
                                        <img src={news_img_1} alt="" />
                                        <div className="p-[10px] flex flex-column w-full">
                                            <h2 className="font-['Calistoga'] text-[26px] mb-[12px]">{newsList[3]?.title}</h2>
                                            <p className="text-[15px]">{newsList[3]?.content}</p>
                                            <Link
                                                className="flex items-center text-[15px] mt-[15px]"
                                                to={`/news-details/${newsList[3]?.newId}`}
                                            >
                                                Xem thêm{" "}
                                                <img className="ml-[4px]" src={arrow_right_black_icon} alt="" />
                                            </Link>
                                        </div>
                                    </div> : null}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default News;


