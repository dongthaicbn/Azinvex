import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import 'antd/dist/antd.css';
import { Layout, Icon, Dropdown, Menu } from 'antd';
import './Header.scss';
import localize from '../../../utils/hocs/localize';
import { actionSetLanguageOnMount } from '../../../reduxModules/common/systemAction';

/*eslint-disable*/

class Header extends React.Component {
  state = {
    isNotification: false
  }
  handleSelectItem = (item, key, keyPath) => {
    if(item.key === "logout") {
      this.props.firebase.logout();
    }
  }
  onChangeLanguage = item => {
    this.props.actionSetLanguageOnMount(item.key, item.key);
  };
  toggleNotification = () => this.setState({ isNotification: !this.state.isNotification });
  render() {
    const { collapsed, t, languageCode } = this.props;
    const { isNotification } = this.state;
    const menu = (
      <Menu style={{ padding: 10 }} onClick={this.handleSelectItem}>
        <Menu.Item key="user">
          <a className="user-info-text"><Icon type="user" style={{ fontSize: 14 }} />&nbsp;&nbsp;{this.props.profileUser.displayName}</a>
        </Menu.Item>
        <Menu.Item key="form">
          <a href="/#/information" className="user-info-text"><Icon type="form" style={{ fontSize: 14 }} />&nbsp;&nbsp;Edit Profile</a>
        </Menu.Item>
        <Menu.Item key="mail">
          <a className="user-info-text"><Icon type="mail" style={{ fontSize: 14 }} />&nbsp;&nbsp;My Inbox</a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a className="user-info-text"><Icon type="logout" style={{ fontSize: 14, transform: 'rotate(-90deg)' }} />&nbsp;&nbsp;Logout</a>
        </Menu.Item>
      </Menu>
    );
    const language = (
      <Menu style={{ padding: 10 }} onClick={this.onChangeLanguage}>
        <Menu.Item key="en">
          <a  className="dropdown-item py-1">
            <img src="../app-assets/img/flags/us.png" className="langimg"/>
            <span>&nbsp;{t('IDS_ENGLISH')}</span>
          </a>
        </Menu.Item>
        <Menu.Item key="vi">
          <a  className="dropdown-item py-1">
            <img src="../app-assets/img/flags/us.png" className="langimg"/>
            <span>&nbsp;{t('IDS_VIETNAMESE')}</span>
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout.Header style={{ background: '#fff', padding: '0 16px 0 0' }}>
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggle}
        />

        {this.props.isAuthenticated &&
          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
            <li className="dropdown nav-item user-info">
              <a data-toggle="dropdown" className="nav-link position-relative dropdown-toggle">
                <i className="ft-user blue-grey darken-4"/>
              </a>
            </li>
          </Dropdown>
        }
        <li className="dropdown nav-item user-info">
          <a data-toggle="dropdown" className="nav-link position-relative dropdown-toggle" onClick={this.toggleNotification}>
            <i className="ft-bell blue-grey darken-4"/>
            <span className="notification badge badge-pill badge-danger">4</span>
          </a>
          {isNotification &&
            <div className="notification-dropdown dropdown-menu dropdown-menu-right show">
              <a className="dropdown-item noti-container py-3 border-bottom border-bottom-blue-grey border-bottom-lighten-4">
                <p className="header-notification">Notifications</p>
              </a>
              <div>
                <a className="dropdown-item noti-container py-3 border-bottom border-bottom-blue-grey border-bottom-lighten-4">
                  <i className="ft-bell warning float-left d-block font-large-1 mt-1 mr-2"/>
                  <span className="noti-wrapper">
                    <span className="noti-title line-height-1 d-block text-bold-400 warning">New User Registered</span>
                    <span className="noti-text">Lorem ipsum dolor sit ametitaque in </span>
                  </span>
                  <span className="date-notification">11:30 A.M</span>
                </a>
                <a className="dropdown-item noti-container py-3 border-bottom border-bottom-blue-grey border-bottom-lighten-4">
                  <i className="ft-bell warning float-left d-block font-large-1 mt-1 mr-2"/>
                  <span className="noti-wrapper">
                    <span className="noti-title line-height-1 d-block text-bold-400 warning">New User Registered</span>
                    <span className="noti-text">Lorem ipsum dolor sit ametitaque in </span>
                  </span>
                  <span className="date-notification">11:30 A.M</span>
                </a>
                <a className="dropdown-item noti-container py-3 border-bottom border-bottom-blue-grey border-bottom-lighten-4">
                  <i className="ft-bell danger float-left d-block font-large-1 mt-1 mr-2"/>
                  <span className="noti-wrapper">
                    <span className="noti-title line-height-1 d-block text-bold-400 danger">New Order Received</span>
                    <span className="noti-text">Lorem ipsum dolor sit ametest?</span>
                  </span>
                  <span className="date-notification">11:30 A.M</span>
                </a>
                <a className="dropdown-item noti-container py-3">
                  <i className="ft-bell success float-left d-block font-large-1 mt-1 mr-2"/>
                  <span className="noti-wrapper">
                    <span className="noti-title line-height-1 d-block text-bold-400 success">New User Registered</span>
                    <span className="noti-text">Lorem ipsum dolor sit ametnatus aut.</span>
                  </span>
                  <span className="date-notification">11:30 A.M</span>
                </a>
              </div>
              <a className="noti-footer primary text-center d-block border-top border-top-blue-grey border-top-lighten-4 text-bold-400 py-1">Read All Notifications</a>
            </div>
          }
        </li>
        <Dropdown overlay={language} trigger={['click']} placement="bottomRight">
          <li className="dropdown nav-item user-info">
            <a data-toggle="dropdown" className="nav-link position-relative dropdown-toggle">
              <img src="../app-assets/img/flags/us.png" className="langimg"/>
              {languageCode}
            </a>
          </li>
        </Dropdown>

      </Layout.Header>
    );
  }
}

export default compose(
  connect(
    state => ({
      isAuthenticated: !state.firebase.auth.isEmpty,
      languageCode: state.system.languageCode
    }),
    {
      actionSetLanguageOnMount
    }
  ),
  localize
)(withFirebase(Header));
