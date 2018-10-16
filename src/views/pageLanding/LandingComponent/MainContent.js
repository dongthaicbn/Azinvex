import React from 'react';
import '../Landing.scss';

import cardProject2 from '../../../assets/landingImages/card-project2.jpg';
import cardProject5 from '../../../assets/landingImages/card-profile5.jpg';
import cardProject6 from '../../../assets/landingImages/card-profile6.jpg';

/* eslint-disable */
const MainContent = () => {
  return (
    <div className="main main-raised">
      <div className="container">
        <div className="section text-center">

          <div className="features-3" style={{ padding: 0 }}>
            <div className="row">
              <div className="col-md-6">
                <div className="phone-container">
                  <img src="https://stickeroid.com/uploads/pic/full-pngimg/d731b08ccb9428191fee9585de1626eed9e4e4d7.png" />
                </div>
              </div>
              <div className="col-md-6">
                <h2 className="title">CHÚNG TÔI CÓ GÌ?</h2>
                <div className="info info-horizontal">
                  <div className="icon icon-primary">
                    <i className="material-icons">history</i>
                  </div>
                  <div className="description">
                    <h4 className="info-title">Không Thể Xoá Lịch Sử Kết Quả</h4>
                    <p>Rất nhiều Nhóm Tín Hiệu đã che giấu kết quả xấu của mình đi bằng cách xoá những lệnh thua,
                      bạn đã gặp những trường hợp như thế chưa?</p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon icon-primary">
                    <i className="material-icons">clear_all</i>
                  </div>
                  <div className="description">
                    <h4 className="info-title">Kết Quả Thống Kê Rõ Ràng</h4>
                    <p>Chúng tôi cung cấp cho bạn những số liệu về giao dịch như Drawdown, Profit Factor, phần trăm
                      lợi nhuận hằng tháng... để bạn đánh giá chính xác nhất</p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon icon-primary">
                    <i className="material-icons">remove_red_eye</i>
                  </div>
                  <div className="description">
                    <h4 className="info-title">Chức Năng Theo Dõi</h4>
                    <p>Chức năng theo dõi sẽ giúp bạn có thể cập nhật liên tục những tín hiệu mới nhất mà không cần
                      phải chờ đợi cả ngày trên chiếc máy tính</p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon icon-primary">
                    <i className="material-icons">attach_money</i>
                  </div>
                  <div className="description">
                    <h4 className="info-title">Nguồn Thu Nhập Khi Làm Chuyên Gia Tín Hiệu</h4>
                    <p>Bạn có thể Kiếm Thêm Nguồn Thu Nhập từ việc tham gia cùng chúng tôi và trở thành Chuyên Gia
                      Bắn Tín Hiệu.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="projects-4" id="projects-4">
          <div className="container">
            <div className="row">
              <div className="col-md-5 ml-auto">
                <div className="card card-background" style={{ backgroundImage: `url(${cardProject2})` }}>
                  <a href="#pablo"></a>
                  <div className="card-body">
                    <span className="badge badge-rose">Đối tượng</span>
                    <a href="#pablo">
                      <h3 className="card-title">Đối Với Khách Hàng</h3>
                    </a>
                    <p className="card-description">
                      Khách hàng là những người bạn cùng đồng hành của AZINVEX trong suốt quá trình làm việc
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-5 mr-auto">
                <div className="info info-horizontal">
                  <div className="icon icon-info">
                    <i className="material-icons">verified_user</i>
                  </div>
                  <div className="description">
                    <h4 className="info-title">Sân Chơi Trong Sạch</h4>
                    <p className="description">
                      Tất cả những gì chúng tôi muốn đem đến cho các bạn chính là một môi trường, một sân chơi hoàn
                      toàn trong sạch.
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon icon-primary">
                    <i className="material-icons">code</i>
                  </div>
                  <div className="description">
                    <h4 className="info-title">Nền Tảng Chuyên Nghiệp</h4>
                    <p className="description">
                      Bạn có thể tận hưởng cảm giác chuyên nghiệp ở Nền Tảng của AZINVEX, được các lập trình viên
                      nhiều năm kinh nghiệp tạo ra.
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon icon-danger">
                    <i className="material-icons">contact_support</i>
                  </div>
                  <div className="description">
                    <h4 className="info-title">Hỗ Trợ</h4>
                    <p className="description">
                      Đội ngũ hỗ trợ của AZINVEX giải đáp thắc mắc.&nbsp;
                      <a style={{ color: 'blue' }} target="_blank" href="https://www.facebook.com/groups/azinvex/">Tham
                      gia Nhóm Facebook</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-5 ml-auto">
                <div className="info info-horizontal">
                  <div className="icon icon-rose">
                    <i className="material-icons">payment</i>
                  </div>
                  <div className="description">
                    <h4 className="info-title">Lợi Nhuận</h4>
                    <p className="description">
                      Chi phí để khách hàng nhận tín hiệu của bạn do bạn hoàn toàn tự quyết định. Khách hàng Không
                      Đăng Ký chỉ có thể xem kết quả. Khách Hàng Đăng Ký mới có thể nhận tín hiệu.
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon icon-success">
                    <i className="material-icons">import_contacts</i>
                  </div>
                  <div className="description">
                    <h4 className="info-title">Hỗ Trợ Kiến Thức</h4>
                    <p className="description">
                      Bạn là người mới nhưng muốn tham gia? Bạn có thể trở thành Chuyên Gia Tín Hiệu với các Khoá
                      Học của AZINVEX
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon icon-info">
                    <i className="material-icons">info</i>
                  </div>
                  <div className="description">
                    <h4 className="info-title">Thông Tin Minh Bạch</h4>
                    <p className="description">
                      Các Khách Hàng đăng ký nhận tín hiệu sẽ được tổng hợp trong danh sách thống kê khách hàng
                      của bạn.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-5 mr-auto">
                <div className="card card-background" style={{ backgroundImage: `url(${cardProject5})` }}>
                  <a  href="#/home"></a>
                  <div className="card-body">
                    <span className="badge badge-rose">Đối Tượng</span>
                    <a href="#/home">
                      <h3 className="card-title">Đối Với Chuyên Gia Bắn Tín Hiệu Forex</h3>
                    </a>
                    <p className="card-description">
                      Các bạn chính là nền tảng của chúng tôi. Và là những người giúp sức cùng AZiNVEX phát triển
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section text-center" style={{ paddingTop: 0 }}>
          <div className="col-md-12">
            <div className="card card-raised card-background" style={{ backgroundImage: `url(${cardProject6})` }}>
              <div className="card-body">
                <h3 className="card-title">Tham Gia Bắn Và Nhận Tín Hiệu FOREX Cùng Chúng Tôi</h3>
                <p className="card-description">
                  Chúng ta cùng nhau tạo một sân chơi trong sạch và minh bạch cho mọi người. Nói không với lừa đảo
                  và các kết quả giao dịch không minh bạch, rõ ràng
                </p>
                <a href="#/home" className="btn btn-warning btn-round">
                  Tham Gia Ngay
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="section section-contacts" style={{ padding: 0 }}>
          <div className="row" style={{ display: 'block' }}>
            <div className="col-md-8 ml-auto mr-auto">
              <h2 className="text-center title">Phản Hồi</h2>
              <h4 className="text-center description">Chúng tôi luôn mong muốn nhận được sự phản hồi của các bạn để
                có thể cải thiện thêm từng chút một. Hãy để lại một vài lời nhận xét nhé</h4>
              <form className="contact-form">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Tên Của Bạn</label>
                      <input type="email" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Email Của Bạn</label>
                      <input type="email" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleMessage" className="bmd-label-floating">Tin Nhắn Của Bạn</label>
                  <textarea type="email" className="form-control" rows="4" id="exampleMessage" />
                </div>
                <div className="row">
                  <div className="col-md-4 ml-auto mr-auto text-center">
                    <button className="btn btn-primary btn-raised">
                      Gửi Tin Nhắn
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
export default MainContent;
