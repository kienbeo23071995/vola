import { campaign_img } from "assets/img";
import { Col, Container, Row } from "react-bootstrap";

function Campaign() {
    return (
        <section className="campaign bg-bg-color-content pt-[38px] pb-[81px]">
            <Container>
                <Row>
                    <Col lg={4}>
                        <div>
                            <h2 className="text-white text-[45px] font-['Calistoga'] mt-[36px] mb-[52px]">Chiến dịch</h2>
                            <span className="text-[24px] text-white">ABC</span>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="flex justify-center">
                            <img src={campaign_img} alt="" />
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="flex justify-center">
                            <img src={campaign_img} alt="" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Campaign;



