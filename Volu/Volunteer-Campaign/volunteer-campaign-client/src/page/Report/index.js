import React, { useEffect, useState } from 'react';
import HeaderPage from "page/components/HeaderPage";
import { Container, Row, Table, Badge } from "react-bootstrap";
import generalReportsApi from "../../apis/generalReportsApi";

function Report() {
    const [generalReports, setGeneralReports] = useState([]);

    useEffect(() => {
        const fetchGeneralReports = async () => {
            try {
                const response = await generalReportsApi.listGeneralReport();
                setGeneralReports(response);
            } catch (error) {
                console.error('Error fetching general reports:', error);
            }
        };

        fetchGeneralReports();
    }, []);

    return (
        <div>
            <HeaderPage title={"Báo cáo"} />
            <section className="py-[60px]">
                <Container>
                    <Row>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>ID Báo cáo</th>
                                    <th>Tệp đính kèm</th>
                                    <th>Ngày tạo</th>
                                    <th>Tên Chiến dịch</th>
                                    <th>Tên Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {generalReports.map((report, index) => (
                                    <tr key={report.generalReportId}>
                                        <td>{report.generalReportId}</td>
                                        <td>{report.attachment ? <a href={report.attachment} target="_blank" rel="noopener noreferrer">Xem tệp</a> : 'Không có tệp'}</td>
                                        <td>{new Date(report.created_at).toLocaleDateString()}</td>
                                       
                                        <td>{report.campaignName}</td>
                                        <td>
                                            <Badge variant={report.statusId === 3 ? 'success' : 'primary'}>
                                                {report.statusName}
                                            </Badge>
                                        </td>
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

export default Report;
