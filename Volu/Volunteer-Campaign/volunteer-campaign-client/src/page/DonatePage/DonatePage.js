import React from 'react'
import {
  Col,
  Container,
} from "reactstrap";

import "./DonatePage.css";
import HeaderPage from 'page/components/HeaderPage';
function DonatePage() {

    return(
        
        <main className='donate-page'>
            <HeaderPage title={"Quyên góp"} />
      <hr />
      
        <h1>Đóng góp trực tiếp vào số tài khoản</h1>
         <Container className="donate-box">
            
  <Col lg="6" className="donate-page__right"> 
  <div>
  <div>
    <p>Tài khoản:1400205513145</p>
    <p>Ngân hàng:Ngân hàng BIDV-Chi nhanh Hòa Lạc</p>
    <p>Chủ tài khoản:Hồ Thị Vân Anh</p>
    <p>SĐT:09121415167</p>
    <p>Nội dung ck ghi rõ: "Tên chiến dịch"+Tên bạn</p>
  </div>
  </div>
  </Col>

  <Col lg="6" className="donate-page__left"> 
  <div className="donate-container">
    <img src="qr.jpg" className="donate-image" />
  </div>  
  </Col>
         </Container>
         
    </main>
  )
}
export default DonatePage;