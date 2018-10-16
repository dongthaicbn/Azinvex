/*eslint-disable */
import React, { } from 'react';
import '../Landing.scss';

const MenuLanding = props => {
  const handleSignOut = () => {
    // props.firebase.logout();
  };
  return (
    <nav className="navbar navbar-color-on-scroll navbar-transparent fixed-top navbar-expand-lg">
      <div className="container">
        <div className="navbar-translate">
          <a className="navbar-brand" href="/">
            <img alt="" style={{ marginTop: '-20px'}} src="https://azinvex.com/images/Logo-Az-invex.png" height="61px" width="243px" />
          </a>
          <button type="button" className="ml-auto navbar-toggler" data-toggle="collapse"
                  data-target="#navigation-example4">
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon" />
            <span className="navbar-toggler-icon" />
            <span className="navbar-toggler-icon" />
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navigation-example4">
          <ul className="navbar-nav navbar-center ml-auto">
            <li className="nav-item">
              <a href="#/home" className="nav-link">
                Trang Chủ
              </a>
            </li>
            <li className="nav-item">
              <a href="#/home" className="nav-link">
                Về Chúng Tôi
              </a>
            </li>
          
            <li className="nav-item">
              <a href="#/contact" className="nav-link">
                Liên Hệ
              </a>
            </li>
            <li className="dropdown nav-item">
              <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                <i className="material-icons">apps</i> Danh Mục
              </a>
              <div className="dropdown-menu dropdown-with-icons">
                {props.profileUser.role === 'expert' &&
                  <a href="#/managesignal" className="dropdown-item">
                    <i className="material-icons">account_balance</i> Manage Signal
                  </a>
                }
                {props.profileUser.role === 'member' &&
                  <a href="#/dashboard" className="dropdown-item">
                    <i className="material-icons">art_track</i> Room Tín Hiệu
                  </a>
                }
                {props.profileUser.role === 'member' &&
                  <a href="#/experts" className="dropdown-item">
                    <i className="material-icons">view_quilt</i> Danh Sách Chuyên Gia
                  </a>
                }
                {props.isAuthenticated &&
                  <a href="#/information" className="dropdown-item">
                    <i className="material-icons">location_on</i> Thông Tin Cá Nhân
                  </a>
                }
                {props.isAuthenticated &&
                  <a href="#/changepassword" className="dropdown-item">
                    <i className="material-icons">view_day</i> Đổi Mật Khẩu
                  </a>
                }
                {props.isAuthenticated &&
                  <a href="#/account" className="dropdown-item">
                    <i className="material-icons">fingerprint</i> Thông Tin Tài Khoản
                  </a>
                }
                <a href="#/help" className="dropdown-item">
                  <i className="material-icons">shopping_basket</i> Hướng Dẫn Sử Dụng
                </a>
                <a href="#/support" className="dropdown-item">
                  <i className="material-icons">attach_money</i> Hỗ Trợ
                </a>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto" style={{ float: 'right' }}>
            {props.isAuthenticated && <li>Xin chào {props.profileUser.displayName}&nbsp;</li>}
            <li className="button-container nav-item iframe-extern">
              {props.isAuthenticated ?
                <a href="#/home" style={{ padding: '.375rem .75rem'}} className="btn btn-rose btn-round btn-block" onClick={handleSignOut}>Logout</a> :
                <a href="#/login" style={{ padding: '.375rem .75rem'}} className="btn btn-rose btn-round btn-block">login</a>
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default MenuLanding;