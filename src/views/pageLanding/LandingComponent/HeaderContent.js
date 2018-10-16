/*eslint-disable */
import React  from 'react';
import landingBG from '../../../assets/landingImages/bg12.jpg';

const HeaderContent = () => {
  return (
    <div className="page-header header-filter" style={{ backgroundImage: `url(${landingBG})` }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1 className="title">Cộng Đồng Tín Hiệu FOREX Minh Bạch</h1>
            <h4>Hiện nay, rất nhiều nhóm Telegram và Zalo bắn tin hiệu Forex với lời hứa mang lại lợi nhuận rất
              lớn và tỷ lệ thắng cực cao.
              Vậy, liệu thông tin đó có được xác thực và tính minh bạch của họ như thế nào?</h4>
            <br />
          </div>
        
        </div>
      </div>
    </div>
  )
}
export default HeaderContent;
