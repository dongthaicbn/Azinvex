import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { Menu, Icon } from 'antd';
import { withFirebase } from 'react-redux-firebase';
import ScrollBar from '../ScrollBar/ScrollBar';
import './Navigation.scss';

/*eslint-disable*/

class Navigation extends React.Component {

  onChangeMenu = item => {
    if(item.key === "logout") {
      this.props.firebase.logout();
    }
    if (item.key === 'home') window.location.href = '#/';
    else window.location.href = `#/${item.key}`;
  };

  render() {
    const { collapsed, role, uid, isAuthenticated } = this.props;
    return (
      <ScrollBar>
        <div className="navigation-container">
          <Menu
            theme="dark"
            mode="inline"
            onClick={this.onChangeMenu}
            inlineCollapsed={collapsed}
          >
          
            <Menu.Item key="home"><Icon type="home" /><span>LadingPage</span></Menu.Item>
            {/* {
              role === 'expert' && <Menu.Item key="managesignal"><Icon type="bar-chart" /><span>Bắn Tín Hiệu</span></Menu.Item>
            } */}
            {
              role === 'expert' && <Menu.Item key={'expert/' + uid}><Icon type="bar-chart" /><span>Trang Cá Nhân</span></Menu.Item>
            }
            {
              role === 'member' && <Menu.Item key="dashboard"><Icon type="home" /><span>Dashboard</span></Menu.Item>
            }
            {
              role === 'member' && <Menu.Item key="experts"><Icon type="bar-chart" /><span>Danh Sách Chuyên Gia</span></Menu.Item>
            }
            {
              role === 'member' && <Menu.Item key="signals"><Icon type="bar-chart" /><span>Room Tín Hiệu</span></Menu.Item>
            }
            {isAuthenticated && 
              <Menu.SubMenu className="nav-item" title={<span><Icon type="user" /><span><i>Quản Lý</i></span></span>}>
                <Menu.Item key="information">Thông Tin Cá Nhân</Menu.Item>
                <Menu.Item key="account">Thông Tin Tài Khoản</Menu.Item>
                <Menu.Item key="changepassword">Đổi Mật Khẩu</Menu.Item>
              </Menu.SubMenu>
            }
            { !isAuthenticated && <Menu.Item key="login"><Icon type="login" /><span>Đăng Nhập</span></Menu.Item> }
            { !isAuthenticated && <Menu.Item key="register"><Icon type="play-circle" /><span>Đăng Ký</span></Menu.Item> }
            <Menu.Item key="help"><Icon type="info-circle" /><span>Hướng Dẫn Sử Dụng</span></Menu.Item>
            <Menu.Item key="support"><Icon type="question-circle" /><span>Hỗ Trợ</span></Menu.Item>
            { isAuthenticated &&  <Menu.Item key="logout"><Icon type="logout" /><span>Đăng Xuất</span></Menu.Item> }
   

          </Menu>
        </div>
      </ScrollBar>
    );
  }
}

const mapStateToProps = state => ({
  role: state.firebase.profile.role,
  isAuthenticated: !state.firebase.auth.isEmpty,
  uid: state.firebase.auth.uid
});
export default connect(mapStateToProps, null)(withFirebase(Navigation));
