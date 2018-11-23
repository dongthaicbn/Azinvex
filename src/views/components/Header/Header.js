import React from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import 'antd/dist/antd.css';
import { Layout, Icon, Dropdown, Menu } from 'antd';
import './Header.scss';

/*eslint-disable*/

class Header extends React.Component {

  handleSelectItem = (item, key, keyPath) => {
    if(item.key === "logout") {
      this.props.firebase.logout();
    }
  }
  render() {
    const { collapsed } = this.props;
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

    return (
      <Layout.Header style={{ background: '#fff', padding: 0 }}>
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggle}
        />
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link user-info">
            <Icon type="user" style={{ fontSize: 30 }}/>&nbsp;<Icon type="caret-down" style={{ fontSize: 16 }} />
          </a>
        </Dropdown>
      </Layout.Header>
    );
  }
}

export default withFirebase(connect(
  state => ({
    // state redux
  }),
  {
    // action
  }
)(Header));
