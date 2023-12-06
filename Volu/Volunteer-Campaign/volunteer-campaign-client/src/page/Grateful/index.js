import React, { useEffect, useState } from 'react';
import HeaderPage from "page/components/HeaderPage";
import { Container, Row, Col, Table, Badge } from "react-bootstrap";
import financialReportApi from '../../apis/financialReportApi';

function Grateful() {
    const [financialReports, setFinancialReports] = useState([]);

    useEffect(() => {
        const fetchFinancialReports = async () => {
            try {
                const response = await financialReportApi.listFinancialReport();
                setFinancialReports(response);
            } catch (error) {
                console.error('Error fetching financial reports:', error);
            }
        };

        fetchFinancialReports();
    }, []);

    return (
        <div>
            <HeaderPage title={"Tri ân"} />
            <section className="py-[60px]">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div>
                                <h2 className="font-['Calistoga'] text-text-color-title text-[45px] text-center mb-[23px]">GÓC TRI ÂN</h2>
                                <h2 className="text-center text-[36px] my-[38px]">Thay mặt ban tổ chức chúng tôi xin bày tỏ lòng biết ơn sâu sắc và cảm tạ các quý ân nhân trong hành trình lan tỏa yêu thương đến các mảnh đời có hoàn cảnh khó khăn trên khắp địa bàn tỉnh Nghệ An.</h2>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <hr />
            <section className="py-[60px]">
                <Container>
                    <Row>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên báo cáo</th>
                                    <th>Số tiền</th>
                                    <th>Tổng chi</th>
                                    <th>Mô tả</th>
                                    <th>Ngày tạo</th>
                                    <th>Người tạo</th>
                                    <th>Chiến dịch</th>
                                    <th>Ghi chú</th>
                                </tr>
                            </thead>
                            <tbody>
                                {financialReports.map((report, index) => (
                                    <tr key={report.financialreport_id}>
                                        <td>{report.financialreport_id}</td>
                                        <td>{report.name}</td>
                                        <td>{report.amount}</td>
                                        <td>{report.total_expenses}</td>
                                        <td>{report.description}</td>
                                        <td>{new Date(report.created_at).toLocaleDateString()}</td>
                                        <td>{report.user_name}</td>
                                        <td>{report.campaign_name}</td>
                                        <td><Badge variant="secondary">{report.note}</Badge></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            </section>
            <hr />
        </div>
    );
}

export default Grateful;