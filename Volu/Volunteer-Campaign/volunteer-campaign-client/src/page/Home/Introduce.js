import { introduction_img_1, introduction_img_2 } from "assets/img";
import { Col, Container, Row } from "react-bootstrap";

function Introduce() {
    return (
        <section className="homepage_introduce mb-[120px]">
            <Container>
                <Row>
                    <Col lg={12}>
                        <h2 className="title_homepage text-text-color-title text-center text-[45px] font-['Calistoga'] mt-[60px] mb-[52px]">Giới thiệu</h2>
                    </Col>
                    <Col lg={4}>
                        <div className="">
                            <Row>
                                <Col lg={12}>
                                    <div className="flex items-center flex-column">
                                        <img src={introduction_img_1} alt="" />
                                        <h3 className="text-[11px] text-text-color-title mt-[16px]">GIỚI THIỆU</h3>
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <div className="flex items-center flex-column mt-[116px]">
                                        <img src={introduction_img_1} alt="" />
                                        <h3 className="text-[11px] text-text-color-title mt-[16px]">GIỚI THIỆU</h3>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="flex justify-center items-center h-full">
                            <img src={introduction_img_2} alt="" />
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="">
                            <Row>
                                <Col lg={12}>
                                    <div className="flex items-center flex-column">
                                        <img src={introduction_img_1} alt="" />
                                        <h3 className="text-[11px] text-text-color-title mt-[16px]">GIỚI THIỆU</h3>
                                    </div>
                                </Col>
                                <Col lg={12}>
                                    <div className="flex items-center flex-column mt-[116px]">
                                        <img src={introduction_img_1} alt="" />
                                        <h3 className="text-[11px] text-text-color-title mt-[16px]">GIỚI THIỆU</h3>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Introduce;

