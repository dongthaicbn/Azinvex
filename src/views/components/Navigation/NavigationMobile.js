import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Layout, Menu, Icon } from 'antd';
import { withFirebase } from 'react-redux-firebase';

import localize from '../../../utils/hocs/localize';
import './Navigation.scss';
import Logo from '../../../assets/logo.png';

const NavigationMobile = ({
  collapsed,
  role,
  uid,
  bgColor,
  isAuthenticated,
  // function
  toggle,
  t
}) => {
  const closeNavigation = () => {
    toggle();
  };
  const onChangeMenu = item => {
    if (item.key === 'logout') {
      this.props.firebase.logout();
      window.location.href = '#/';
    } else if (item.key === 'home') window.location.href = '#/';
    else window.location.href = `#/${item.key}`;
    closeNavigation();
  };
  return (
    <Layout className={`navigation-mobile-container ${!collapsed && 'hide'}`} onClick={closeNavigation}>
      <Layout.Sider
        style={{ backgroundImage: 'url("../app-assets/img/sidebar-bg/04.jpg")' }}
        className="navigation-content"
        onClick={e => e.stopPropagation()}
      >
        <div style={{ ...bgColor, opacity: 0.77, height: '100%' }}>
          <div className="logo-img">
            <a alt="Home" href="#/"> <img src={Logo} alt="" /><span className="app-title">AZINVEX</span></a>
          </div>
          <Menu theme="dark" mode="inline" onClick={onChangeMenu}>
            {role === 'expert' && <Menu.Item key={'expert/' + uid}><Icon type="home" style={{ fontSize: 16 }} /><span className="menu-title">{t('IDS_EXPERTS_AREA')}</span></Menu.Item>}
            {role === 'expert' && <Menu.Item key="account"><Icon type="code-sandbox" style={{ fontSize: 16 }} />&nbsp;<span className="menu-title">Nền tảng giao dịch</span></Menu.Item>}
            {role === 'member' && <Menu.Item key="dashboard"><Icon type="home" style={{ fontSize: 16 }} /><span className="menu-title">{t('IDS_HOME')}</span></Menu.Item>}
            {role === 'member' && <Menu.Item key="experts"><Icon type="team" style={{ fontSize: 16 }} /><span className="menu-title">{t('IDS_LIST_EXPERTS')}</span></Menu.Item>}

            {isAuthenticated &&
            <Menu.SubMenu className="nav-item" title={<span><Icon type="form" style={{ fontSize: 16 }} /><span className="menu-title">{t('IDS_MANAGE')}</span></span>}>
              <Menu.Item key="information"><span className="menu-title">{t('IDS_PERSONAL_INFORMATION')}</span></Menu.Item>
              {role === 'expert' && <Menu.Item key="signal/expert"><span className="menu-title">{t('IDS_SIGNAL_ROOM')}</span></Menu.Item>}
              {role === 'member' && <Menu.Item key="signals"><span className="menu-title">{t('IDS_SIGNAL_ROOM')}</span></Menu.Item>}
              <Menu.Item key="changepassword"><span className="menu-title">{t('IDS_CHANGE_PASSWORD')}</span></Menu.Item>
            </Menu.SubMenu>
            }
            {!isAuthenticated && <Menu.Item key="login"><i className="ft-home" />&nbsp;<span className="menu-title">{t('IDS_LOGIN')}</span></Menu.Item>}
            {!isAuthenticated && <Menu.Item key="register"><i className="ft-home" />&nbsp;<span className="menu-title">{t('IDS_REGISTER')}</span></Menu.Item>}
            <Menu.Item key="help"><Icon type="info-circle" style={{ fontSize: 16 }} /><span className="menu-title">{t('IDS_GUIDE')}</span></Menu.Item>
            <Menu.Item key="support"><Icon type="deployment-unit" style={{ fontSize: 16 }} />&nbsp;<span className="menu-title">{t('IDS_SUPPORT')}</span></Menu.Item>
            {isAuthenticated && <Menu.Item key="logout"><Icon type="logout" style={{ fontSize: 16, transform: 'rotate(-90deg)' }} />&nbsp;<span className="menu-title">{t('IDS_LOGOUT')}</span></Menu.Item>}

          </Menu>
        </div>
      </Layout.Sider>
    </Layout>
  );
};

const mapStateToProps = state => ({
  location: state.location,
  hideNavigationMobile: state.system.hideNavigationMobile,
  role: state.firebase.profile.role,
  isAuthenticated: !state.firebase.auth.isEmpty,
  uid: state.firebase.auth.uid
});
export default compose(
  connect(
    mapStateToProps,
    {
      // action
    }
  ),
  localize
)(withFirebase(NavigationMobile));
