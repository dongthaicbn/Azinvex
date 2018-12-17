import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import 'antd/dist/antd.css';
import { Menu, Icon, Dropdown } from 'antd';
import { withFirebase } from 'react-redux-firebase';
import ScrollBar from '../ScrollBar/ScrollBar';
import './Navigation.scss';
import localize from '../../../utils/hocs/localize';
import { actionSetLanguageOnMount } from '../../../reduxModules/common/systemAction';
import Logo from '../../../assets/logo.png';
/*eslint-disable*/

class Navigation extends React.Component {

  onChangeMenu = item => {
    if(item.key === 'logout') {
      this.props.firebase.logout();
      window.location.href = '#/';
    } else if (item.key === 'home') window.location.href = '#/';
    else window.location.href = `#/${item.key}`;
  };
  onChangeLanguage = item => {
    this.props.actionSetLanguageOnMount(item.key, item.key);
  };

  render() {
    const { collapsed, role, uid, isAuthenticated, t, languageCode, bgColor } = this.props;
    const menuLanguage = (
      <Menu onClick={this.onChangeLanguage}>
        <Menu.Item key="en"><a>{t('IDS_ENGLISH')}</a></Menu.Item>
        <Menu.Item key="vi"><a>{t('IDS_VIETNAMESE')}</a></Menu.Item>
      </Menu>
    );
    return (
      <ScrollBar>
        <div style={{ ...bgColor, opacity: 0.77 }}>
          <div className="logo-img">
            <a alt="Home" href="#/"> <img src={Logo} alt="" />{!collapsed && <span className="app-title">AZINVEX</span>} </a>
          </div>
          <div className="navigation-container">
            <Menu theme="dark" mode="inline" onClick={this.onChangeMenu} inlineCollapsed={collapsed}>
              {role === 'expert' && <Menu.Item key={'expert/' + uid}><i className="ft-home" />&nbsp;<span className="menu-title">{t('IDS_EXPERTS_AREA')}</span></Menu.Item>}
              {role === 'expert' && <Menu.Item key="account"><i className="ft-box" />&nbsp;<span className="menu-title">Nền tảng giao dịch</span></Menu.Item>}
              {role === 'member' && <Menu.Item key="dashboard"><i className="ft-home" />&nbsp;<span className="menu-title">{t('IDS_HOME')}</span></Menu.Item>}
              {role === 'member' && <Menu.Item key="experts"><i className="ft-users" />&nbsp;<span className="menu-title">{t('IDS_LIST_EXPERTS')}</span></Menu.Item>}

              {isAuthenticated &&
                <Menu.SubMenu className="nav-item" title={<span><i className="ft-edit" />&nbsp;<span className="menu-title">{t('IDS_MANAGE')}</span></span>}>
                  <Menu.Item key="information"><span className="menu-title">{t('IDS_PERSONAL_INFORMATION')}</span></Menu.Item>
                  {role === 'expert' && <Menu.Item key="signal/expert"><span className="menu-title">{t('IDS_SIGNAL_ROOM')}</span></Menu.Item>}
                  {role === 'member' && <Menu.Item key="signals"><span className="menu-title">{t('IDS_SIGNAL_ROOM')}</span></Menu.Item>}
                  <Menu.Item key="changepassword"><span className="menu-title">{t('IDS_CHANGE_PASSWORD')}</span></Menu.Item>
                </Menu.SubMenu>
              }
              {!isAuthenticated && <Menu.Item key="login"><i className="ft-home" />&nbsp;<span className="menu-title">{t('IDS_LOGIN')}</span></Menu.Item>}
              {!isAuthenticated && <Menu.Item key="register"><i className="ft-home" />&nbsp;<span className="menu-title">{t('IDS_REGISTER')}</span></Menu.Item>}
              <Menu.Item key="help"><i className="ft-alert-circle" />&nbsp;<span className="menu-title">{t('IDS_GUIDE')}</span></Menu.Item>
              <Menu.Item key="support"><i className="ft-life-buoy" />&nbsp;<span className="menu-title">{t('IDS_SUPPORT')}</span></Menu.Item>
              {isAuthenticated && <Menu.Item key="logout"><i className="ft-power" />&nbsp;<span className="menu-title">{t('IDS_LOGOUT')}</span></Menu.Item>}

            </Menu>
          </div>
          <div className="select-language">
            <Dropdown overlay={menuLanguage}>
              <a className="ant-dropdown-link">{languageCode === 'vi' ? t('IDS_VIETNAMESE') : t('IDS_ENGLISH')} <Icon type="down" /></a>
            </Dropdown>
          </div>
        </div>
      </ScrollBar>
    );
  }
}

const mapStateToProps = state => ({
  role: state.firebase.profile.role,
  isAuthenticated: !state.firebase.auth.isEmpty,
  uid: state.firebase.auth.uid,
  languageCode: state.system.languageCode
});
export default compose(
  connect(
    mapStateToProps,
    {
      actionSetLanguageOnMount
    }
  ),
  localize
)(withFirebase(Navigation));
