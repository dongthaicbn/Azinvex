/*eslint-disable */
import React from 'react';
import { withFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Menu, Dropdown } from 'antd';

import { actionNavigateTo } from '../../../reduxModules/common/routes';
import * as routes from '../../../utils/constants/routes';
import '../Landing.scss';

const { SubMenu } = Menu;

const MenuLanding = props => {

  const handleSignOut = () => {
    props.firebase.logout();

  };

  const menu = (
    <Menu>
      {props.profileUser.role === 'expert' &&
        <Menu.Item>
          <a href="#/managesignal" className="dropdown-item">
            <i className="material-icons">account_balance</i> Bắn Tín Hiệu
          </a>
        </Menu.Item>
      }
      {props.profileUser.role === 'expert' &&
        <Menu.Item>
          <a href={'#/expert/' + props.uid} className="dropdown-item">
            <i className="material-icons">view_quilt</i> Trang Cá Nhân
          </a>
        </Menu.Item>
      }
      {props.profileUser.role === 'member' &&
        <Menu.Item>
          <a href="#/dashboard" className="dropdown-item">
            <i className="material-icons">art_track</i> Dashboard
          </a>
        </Menu.Item>
      }
      {props.profileUser.role === 'member' &&
        <Menu.Item>
          <a href="#/experts" className="dropdown-item">
            <i className="material-icons">view_quilt</i> Danh Sách Chuyên Gia
          </a>
        </Menu.Item>
      }
      {props.profileUser.role === 'member' &&
        <a href="#/signals" className="dropdown-item">
          <i className="material-icons">art_track</i> Room Tín Hiệu
        </a>
      }
      {props.isAuthenticated &&
        <Menu.Item>
          <a href="#/information" className="dropdown-item">
            <i className="material-icons">location_on</i> Thông Tin Cá Nhân
          </a>
        </Menu.Item>
      }
      {props.isAuthenticated &&
        <Menu.Item>
          <a href="#/changepassword" className="dropdown-item">
            <i className="material-icons">view_day</i> Đổi Mật Khẩu
          </a>
        </Menu.Item>
      }
      {props.isAuthenticated &&
        <Menu.Item>
          <a href="#/account" className="dropdown-item">
            <i className="material-icons">fingerprint</i> Thông Tin Tài Khoản
          </a>
        </Menu.Item>
      }
      <Menu.Item>
        <a href="#/help" className="dropdown-item">
          <i className="material-icons">shopping_basket</i> Hướng Dẫn Sử Dụng
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="#/support" className="dropdown-item">
          <i className="material-icons">attach_money</i> Hỗ Trợ
        </a>
      </Menu.Item>
    </Menu>
  );

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
              <Dropdown overlay={menu}>
                <a className="dropdown-toggle nav-link" data-toggle="dropdown">
                  <i className="material-icons">apps</i> Danh Mục
                </a>
              </Dropdown>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto" style={{ float: 'right' }}>
            {props.isAuthenticated && <li>Xin chào {props.profileUser.displayName}&nbsp;</li>}
            <li className="button-container nav-item iframe-extern">
              {props.isAuthenticated ?
                <a href="#/" style={{ padding: '.375rem .75rem'}} className="btn btn-rose btn-round btn-block" onClick={handleSignOut}>Logout</a> :
                <a href="#/login" style={{ padding: '.375rem .75rem'}} className="btn btn-rose btn-round btn-block">login</a>
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default withFirebase(
  connect(
    state => ({
      uid: state.firebase.auth.uid
    }),
    {
      actionNavigateTo
    }
  )(MenuLanding));