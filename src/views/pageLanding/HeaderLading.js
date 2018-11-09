/*eslint-disable */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Menu, Dropdown, Icon, Button } from 'antd';

import { actionNavigateTo } from '../../reduxModules/common/routes';
import * as routes from '../../utils/constants/routes';
import './Landing.scss';

class HeaderLanding extends Component {

  handleLog = (event) => () => {
    if(event === 'login') {
      this.props.actionNavigateTo(routes.ROUTE_LOGIN);
    } else {
      this.props.firebase.logout();
    }
  }

  render() {
    const { profileUser, isAuthenticated, uid } = this.props;
    const menu = (
      <Menu>
        {/* {profileUser.role === 'expert' &&
          <Menu.Item>
            <a href="#/managesignal" className="dropdown-item">Bắn Tín Hiệu</a>
          </Menu.Item>
        } */}
        {profileUser.role === 'expert' &&
          <Menu.Item>
            <a href={'#/expert/' + uid} className="dropdown-item">Trang Cá Nhân</a>
          </Menu.Item>
        }
        {profileUser.role === 'member' &&
          <Menu.Item>
            <a href="#/dashboard" className="dropdown-item">Dashboard</a>
          </Menu.Item>
        }
        {profileUser.role === 'member' &&
          <Menu.Item>
            <a href="#/experts" className="dropdown-item">Danh Sách Chuyên Gia</a>
          </Menu.Item>
        }
        {profileUser.role === 'member' &&
          <Menu.Item>
            <a href="#/signals" className="dropdown-item">Room Tín Hiệu</a>
          </Menu.Item>
        }
        {isAuthenticated &&
          <Menu.Item>
            <a href="#/information" className="dropdown-item">Thông Tin Cá Nhân</a>
          </Menu.Item>
        }
        {isAuthenticated &&
          <Menu.Item>
            <a href="#/changepassword" className="dropdown-item">Đổi Mật Khẩu</a>
          </Menu.Item>
        }
        {isAuthenticated &&
          <Menu.Item>
            <a href="#/account" className="dropdown-item">Thông Tin Tài Khoản</a>
          </Menu.Item>
        }
        <Menu.Item>
          <a href="#/help" className="dropdown-item">Hướng Dẫn Sử Dụng</a>
        </Menu.Item>
        <Menu.Item>
          <a href="#/support" className="dropdown-item">Hỗ Trợ</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <React.Fragment>
        <div className="logo-page">
          <img alt="logo-page" src="https://azinvex.com/images/Logo-Az-invex.png" className="img-logo"/>
        </div>
        <Menu 
          mode="horizontal"
          className="menu-header">
          <Menu.Item>
            <a href="#/home" className="nav-link">Trang Chủ</a>
          </Menu.Item>
          <Menu.Item>
            <a href="#/home" className="nav-link">Về Chúng Tôi</a>
          </Menu.Item>
          <Menu.Item>
            <a href="#/contact" className="nav-link">Liên Hệ</a>
          </Menu.Item>
          <Menu.Item>
            <Dropdown overlay={menu}>
              <a className="nav-link">
                <Icon type="appstore" style={{ fontSize: '13px'}}/>Danh Mục
                <Icon type="caret-down" style={{ fontSize: '14px', paddingLeft: '4px'}}/>
              </a>
            </Dropdown>
          </Menu.Item>
        </Menu>
        <div className="display-name">
          {isAuthenticated && <span className="name-user">Xin chào {profileUser.displayName}&nbsp;</span>}
          {!isAuthenticated ?
            <Button type="primary" className="btn-login" onClick={this.handleLog('login')}>Login</Button> :
            <Button type="primary" className="btn-login" onClick={this.handleLog('logout')}>Logout</Button>
          }
        </div>
      </React.Fragment>
    )
  }
}

export default withFirebase(
  connect(
    state => ({
      isAuthenticated: !state.firebase.auth.isEmpty,
      profileUser: state.firebase.profile,
      uid: state.firebase.auth.uid
    }),
    {
      actionNavigateTo
    }
  )
(HeaderLanding));
