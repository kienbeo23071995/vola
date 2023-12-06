import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import AdminTopbar from "./components/AdminTopbar";

import AdminSidebar from "./components/AdminSidebar";
import MenuAdmin from "./components/MenuAdmin";
import MenuPlanningManager from "./components/MenuPlanningManager";

function CaptionLayout() {
  return (
    <div className="bg-color-bg-admin">
      <Container fluid>
        <Row>
          <Col lg={3}>
            <MenuCaption />
          </Col>
          <Col lg={9}>
            <div className="h-full pt-[15px] pb-15px] flex flex-column">
              <AdminTopbar />
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CaptionLayout;
