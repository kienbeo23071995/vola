import { donor_img } from "assets/img";
import { Col, Container, Row } from "react-bootstrap";

function Donor() {
    return (
        <section className="donor pt-[28px] pb-[70px]">
            <Container>
                <Row>
                    <Col lg={12}>
                        <h2 className="text-[45px] font-['Calistoga'] text-center text-text-color-title">Góc tri ân</h2>
                        <h3 className="text-[18px] text-center mb-[47px] mt-[6px]">Cảm ơn</h3>
                    </Col>
                    <Col lg={4}>
                        <div className="flex items-center justify-end">
                            <img src={donor_img} alt="" />
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className="flex items-center justify-end">
                            <img src={donor_img} alt="" />
                        </div>
                    </Col>
                    <Col lg={3}>
                        <div className="flex items-center justify-end">
                            <img src={donor_img} alt="" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Donor;


