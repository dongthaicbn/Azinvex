import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import './Help.scss';
import bg10 from '../../assets/landingImages/bg10.jpg';
import MenuLanding from '../pageLanding/LandingComponent/MenuLanding';

/*eslint-disable*/
class Help extends Component {

  componentDidMount() {
    if ($('.navbar-color-on-scroll').length !== 0) {
      $(window).on('scroll', this.checkScrollForTransparentNavbar);
    }
  }

  checkScrollForTransparentNavbar = () => {
    if ($(document).scrollTop() > 300) {
      $('.navbar-color-on-scroll').removeClass('navbar-transparent');
    } else {
      $('.navbar-color-on-scroll').addClass('navbar-transparent');
    }
  };
  render() {
    const { profileUser, isAuthenticated, auth } = this.props;
    return (
      <div className="blog-posts sidebar-collapse">

        <MenuLanding
          profileUser={profileUser}
          isAuthenticated={isAuthenticated}
          auth = {auth}
          firebase={this.props.firebase}
        />

        <div className="page-header header-filter header-small" data-parallax="true" style={{ backgroundImage: `url(${bg10})` }}>
          <div className="container">
            <div className="row">
              <div className="col-md-8 ml-auto mr-auto text-center">
                <h1 className="title">Hướng Dẫn Sử Dụng Trang Tín Hiệu AZINVEX</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="main main-raised">
          <div className="container">
            <div className="section section-text">
              <div className="row">
                <div className="col-md-8 ml-auto mr-auto">
                  <h2 style={{ color: 'red' }} className="title">ĐĂNG KÝ TÀI KHOẢN</h2>
                  <p>- Bạn có thể đăng ký tài khoản bằng cách nhấp vào biểu tượng LOGIN ở góc trên, bên phải màn hình</p>
                  <img className="img-raised rounded img-fluid" alt="Raised" src="https://azinvex.com/files/folder_web/images/1-Wum400.png" />
                  <p>- Sau đó, bạn có thể thấy giao diện của trang Đăng Nhập. Ở đây bạn có thể:</p>
                  <ul>
                    <li>Đăng ký bằng tài khoản Facebook</li>
                    <li>Đăng ký bằng tài khoản Google</li>
                    <li>Đăng ký một tài khoản mới</li>
                  </ul>
                  <img className="img-raised rounded img-fluid" alt="Raised Image" src="https://azinvex.com/files/folder_web/images/2-x8m700.png" alt="" />
                  <p>- Sau khi đăng ký thành công, hệ thống sẽ đưa bạn quay về Trang Chủ. <br /></p>
                  <p>- Nếu biểu tượng LOGIN đã chuyển thành Xin Chào "Tên Bạn" thì chúc mừng, bạn đã đăng ký thành công!<br /></p>
                  <p>- Tiếp tục, bạn có thể thay đổi thông tin cá nhân của mình bằng cách nhấp chuột vào "Tên Bạn" để di chuyển đến Trang Cá Nhân</p>
                  <img className="img-raised rounded img-fluid" alt="Raised Image" src="https://azinvex.com/files/folder_web/images/3-dei200.png" />
                  <p>Sau khi đến được Trang Cá Nhân, bạn di chuyển chuột vào thanh bên trái, chọn mục Quản Lý. Tại đây có 3 mục:</p>
                  <ul>
                    <li><b>Thông Tin Cá Nhân:</b><i> Bạn cập nhật các thông tin như "Website", "Số điện thoại", "Kinh nghiệm giao dịch" và "Mô tả bản thân" để mọi người biết đến bạn.</i></li>
                    <li><b>Đổi Mật Khẩu:</b> <i>Đổi mật khẩu trong trường hợp bạn cảm thấy tài khoản của bạn đang bị xâm phạm</i></li>
                    <li><b>Thông Tin Tài Khoản:</b> <i>Đang cập nhật...</i></li>
                  </ul>
                  <img className="img-raised rounded img-fluid" alt="Raised Image" src="https://azinvex.com/files/folder_web/images/4-o0K100.png" />
                  <hr />
                  <h2 style={{ color: 'red' }} className="title">ĐỐI VỚI THÀNH VIÊN <u>NHẬN</u> TÍN HIỆU</h2>
                  <h3 style={{ color: 'blue' }} className="title">Danh Sách Chuyên Gia</h3>
                  <img className="img-raised rounded img-fluid" alt="Raised Image" src="https://azinvex.com/files/folder_web/images/3-tMu800.png" />
                  <p>- Tại đây bạn có thể thấy được thông tin chi tiết của Tất Cả các Chuyên Gia Bắn Tín Hiệu. Bạn có thể thấy "Tên", "Status", "Tỷ Lệ Chiến Thắng" và "Số pips đạt được"
                    của từng người. Từ các thông số này, bạn có thể lựa chọn cho mình các Chuyên Gia nào mà bạn tin tưởng muốn Theo Dõi.</p>
                  <p>- Bạn có thể thấy Follow. Đây là nút Theo Dõi Tín Hiệu của các Chuyên Gia Tín Hiệu mà bạn tin tưởng</p>
                  <p>- Để tìm hiểu thêm chi tiết của từng Chuyên Gia, bạn chọn mục Chi Tiết:</p>
                  <img className="img-raised rounded img-fluid" alt="Raised Image" src="https://azinvex.com/files/folder_web/images/5-dWi800.png" />
                  <ul>
                    <li><b>Phòng Tín Hiệu:</b> <i>Các Tín Hiệu đã bắn của Chuyên Gia. Bạn có thể trò chuyện và trao đổi với Chuyên Gia tại đây</i></li>
                    <li><b>Thông tin:</b> <i>Giúp bạn hiểu thêm về Chuyên Gia</i></li>
                    <li><b>Lịch Sử</b> <i>Lịch sử kết quả Thắng / Thua của Chuyên Gia. Thông tin về Lịch Sử này là KHÔNG THỂ XOÁ HAY SỬA ĐỔI. AZINVEX luôn đảm bảo tính khách quan và minh bạch cho các thành viên nhận tín hiệu"</i></li>
                    <li><b>Photo:</b> <i>Nơi "nhiệt huyết sống ảo" của Chuyên Gia</i></li>
                  </ul>
                  <h3 style={{ color: 'blue' }} className="title">Dashboard</h3>
                  <img className="img-raised rounded img-fluid" alt="Raised Image" src="https://azinvex.com/files/folder_web/images/1-xVY200.png" />
                  <ol>
                    <li style={{ fontWeight: 700 }}>Tổng quan về tất cả các tín hiệu đang hoạt động trên hệ thống của AZINVEX</li>
                    <ul>
                      <li><b>Lệnh đang hoạt đông:</b> <i>Tất cả các Tín Hiệu đang hoạt động trên hệ thống của AZINVEX</i></li>
                      <li><b>Tổng số Pips:</b> <i>Tổng kết toàn bộ Số Pips thắng / thua trên hệ thống của AZINVEX</i></li>
                      <li><b>Người dùng hoạt động:</b> <i>Toàn bộ người dùng đang hoạt động tính vào thời điểm hiện tại</i></li>
                      <li><b>Chuyên gia:</b> <i>Số người đăng ký làm Chuyên Gia Bắn Tín Hiệu tại AZINVEX</i></li>
                    </ul>
                    <li style={{ fontWeight: 700 }}>Top các chuyên gia Forex: <i style={{ fontWeight: 100 }}>Danh sách các Chuyên Gia Bắn Tín Hiệu tốt nhất</i></li>
                    <li style={{ fontWeight: 700 }}>Timeline: <i style={{ fontWeight: 100 }}>Dòng thời gian của tất cả các lệnh được bắn từ các Chuyên Gia bạn Theo Dõi</i></li>
                    <ul>
                      <li><b>Ticket:</b> <i>Mã của lệnh được Chuyên Gia bắn</i></li>
                      <li><b>Tên Của Chuyên Gia Bắn Tín Hiệu</b></li>
                      <li><b>Trạng Thái:</b> <i>Trạng thái của lệnh, có thể là "Mở Lệnh", "Đóng Lệnh" hoặc "Sửa Lệnh"</i></li>
                      <li><b>Chuyên Gia:</b> <i>Số người đăng ký làm Chuyên Gia Bắn Tín Hiệu tại AZINVEX</i></li>
                      <li><b>Loại Lệnh:</b> <i>Buy hoặc Sell</i></li>
                      <li><b>Cặp Tiền</b></li>
                      <li><b>Open Price:</b> <i>Giá mở lệnh</i></li>
                      <li><b>Thời Gian Mở Lệnh</b></li>
                      <li><b>Stop Loss và Take Profit</b></li>
                    </ul>
                  </ol>
                  <h3 style={{ color: 'blue' }} className="title">Room Tín Hiệu</h3>
                  <img className="img-raised rounded img-fluid" alt="Raised Image" src="https://azinvex.com/files/folder_web/images/2-VZE700.png" />
                  <ol>
                    <li style={{ fontWeight: 700 }}>Danh Sách Chuyên Gia: <i style={{ fontWeight: 100 }}>Danh sách các Chuyên Gia Tín Hiệu mà bạn Theo Dõi</i></li>
                    <li style={{ fontWeight: 700 }}>View: <i style={{ fontWeight: 100 }}>Chọn Chuyên Gia bạn muốn xem tín hiệu</i></li>
                    <li style={{ fontWeight: 700 }}>Danh Sách Tín Hiệu: <i style={{ fontWeight: 100 }}>Danh sách các Tín Hiệu của Chuyên Gia bạn chọn</i></li>
                  </ol>
                  <hr />
                  <h2 style={{ color: 'red' }} className="title">ĐỐI VỚI THÀNH VIÊN <u>BẮN</u> TÍN HIỆU</h2>
                  <p>Đối với Thành Viên muốn trở thành Chuyên Gia Bắn Tín Hiệu, bạn cần Đăng Ký Tài Khoản như các thành viên bình thường.
                    Sau đó liên lạc với đội ngũ của AZINVEX để xét duyệt về trình độ và kiến thức trước khi trở thành Chuyên Gia Bắn Tín Hiệu.
                    Thông tin liên lạc:</p>
                  <ul>
                    <li><b>Số Điện Thoại:</b> 096 690 7454</li>
                    <li><b>Facebook:</b> <a style={{ color: 'blue' }} target="_blank" href="https://www.facebook.com/ReyDyuki95">https://www.facebook.com/ReyDyuki95</a></li>
                    <li><b>Email:</b> reydyuki95@gmail.com</li>
                    <li><b>Địa Chỉ Liên Hệ:</b> 208 Nguyễn Hữu Cảnh, LandMark 2, Vinhome Central Park, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh</li>
                  </ul>
                  <h3 style={{ color: 'blue' }} className="title">Quyền Lợi</h3>
                  <ul>
                    <li>Tự do ra Mức Giá bắn tín hiệu theo mong muốn và trình độ của Chuyên Gia</li>
                    <li>Nhận được thu nhập từ khách hàng nhận tín hiệu</li>
                    <li>Được hỗ trợ và cung cấp thêm kiến thức để tăng chất lượng của tín hiệu</li>
                  </ul>
                  <h3 style={{ color: 'blue' }} className="title">Trang Cá Nhân</h3>
                  <img className="img-raised rounded img-fluid" alt="Raised Image" src="https://azinvex.com/files/folder_web/images/6-ZAe200.png" />
                  <ul>
                    <li><b>Phòng Tín Hiệu:</b> <i>Các Tín Hiệu đã bắn của Chuyên Gia. Bạn có thể trò chuyện và trao đổi với Khách Hàng tại đây</i></li>
                    <li><b>Thông tin:</b> <i>Thông tin Cá Nhân của bạn. Khách hàng sẽ thấy được các Thông Tin này để quyết định chọn bạn hay không</i></li>
                    <li><b>Lịch Sử</b> <i>Lịch sử kết quả Thắng / Thua của Chuyên Gia. Thông tin về Lịch Sử này là KHÔNG THỂ XOÁ HAY SỬA ĐỔI. AZINVEX luôn đảm bảo tính khách quan và minh bạch cho các thành viên nhận tín hiệu"</i></li>
                    <li><b>Photo:</b> <i>Nơi "nhiệt huyết sống ảo" của Chuyên Gia</i></li>
                  </ul>
                  <h3 style={{ color: 'blue' }} className="title">Bắn Tín Hiệu</h3>
                  <img className="img-raised rounded img-fluid" alt="Raised Image" src="https://azinvex.com/files/folder_web/images/7-Yca800.png" />
                  <ul>
                    <li><b>Quản Lý Tín Hiệu</b>
                      <ul>
                        <li><b>Cặp Tiền:</b> <i>Chuyên Gia chọn cặp tiền cần bắn Tín Hiệu</i></li>
                        <li><b>Buy Sell:</b> <i>Chọn loại lệnh, Buy hay Sell?</i></li>
                        <li><b>StopLoss &amp; TakeProfit:</b> <i>Điền Stop Loss và Take Profit cẩn thận!</i></li>
                        <li><b>Bắn Tín Hiệu:</b> <i>Sau khi chắc chắn các thông tin của bạn là chính xác, chọn "Bắn Tín Hiệu". Một khi Tín Hiệu được bắn, vì tính minh bạch và khách quan, Chuyên Gia <b><i>KHÔNG THỂ XOÁ LỆNH</i></b>.
                          Hãy suy nghĩ trước khi Bắn Tín Hiệu, vì quyền lợi của Chuyên Gia cũng như của Khách Hàng.</i></li>
                      </ul>
                    </li>
                    <li><b>Các Lệnh Đang Chạy:</b> <i>Chuyên Gia có thể theo dõi lệnh đã bắn tại mục này</i></li>
                    <ul>
                      <li><b>Sửa Lệnh:</b> <i>Dùng để sửa Stop Loss và Take Profit cho phù hợp với thị trường</i></li>
                      <li><b>Tắt Lệnh:</b> <i>Kết thúc lệnh, chốt Lời/ Lỗ/ Hoà</i></li>
                    </ul>
                  </ul>
                  <h2 style={{ color: 'red' }} className="title">Hỗ Trợ, Góp Ý và Báo Cáo Lỗi</h2>
                  <p>Nếu cần Hỗ Trợ trong quá trình sử dụng, Góp Ý và Sửa Lỗi trong quá trình sử dụng, bạn có thể liên hệ:</p>
                  <ul>
                    <li><b>Số Điện Thoại:</b> 096 690 7454</li>
                    <li><b>Facebook:</b> <a style={{ color: 'blue' }} target="_blank" href="https://www.facebook.com/ReyDyuki95">https://www.facebook.com/ReyDyuki95</a></li>
                    <li><b>Email:</b> reydyuki95@gmail.com</li>
                    <li><b>Địa Chỉ Liên Hệ:</b> 208 Nguyễn Hữu Cảnh, LandMark 2, Vinhome Central Park, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh</li>
                  </ul>
                  <p>Chúng tôi luôn luôn mong muốn nhận được sự Phản Hồi từ các bạn để có thể mỗi ngày một cải tiến thêm. AZINVEX sinh ra với mục đích mang lại sân chơi và môi trường chuyên nghiệp, minh bạch cho tất cả mọi người.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(
  state => ({
    auth: state.firebase.auth,
    isAuthenticated: !state.firebase.auth.isEmpty,
    profileUser: state.firebase.profile
  }),
  {
    // action
  }
)(Help);
