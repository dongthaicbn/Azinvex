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
    const { collapsed, role, uid, isAuthenticated, t, languageCode } = this.props;
    const menuLanguage = (
      <Menu onClick={this.onChangeLanguage}>
        <Menu.Item key="en"><a>{t('IDS_ENGLISH')}</a></Menu.Item>
        <Menu.Item key="vi"><a>{t('IDS_VIETNAMESE')}</a></Menu.Item>
      </Menu>
    );
    return (
      <ScrollBar>
        <div className="navigation-container">
          <Menu
            theme="dark"
            mode="inline"
            onClick={this.onChangeMenu}
            inlineCollapsed={collapsed}
          >
            {
              role === 'expert' && <Menu.Item key={'expert/' + uid}><Icon type="bar-chart" /><span>Khu Vực Chuyên Gia</span></Menu.Item>
            }

            {
              role === 'expert' && <Menu.Item key="account"><Icon type="bar-chart" />Nền tảng giao dịch</Menu.Item>
            }
            {
              role === 'member' && <Menu.Item key="dashboard"><Icon type="home" /><span>{t('IDS_HOME')}</span></Menu.Item>
            }
            {
              role === 'member' && <Menu.Item key="experts"><Icon type="bar-chart" /><span>Danh Sách Chuyên Gia</span></Menu.Item>
            }
            
 
            {isAuthenticated &&
              <Menu.SubMenu className="nav-item" title={<span><Icon type="user" /><span>{t('IDS_MANAGE')}</span></span>}>
                <Menu.Item key="information">{t('IDS_PERSONAL_INFORMATION')}</Menu.Item>
                {
                  role === 'expert' && <Menu.Item key="signal/expert"><span>{t('IDS_SIGNAL_ROOM')}</span></Menu.Item>
                }
                {
                  role === 'member' && <Menu.Item key="signals"><span>{t('IDS_SIGNAL_ROOM')}</span></Menu.Item>
                }
                <Menu.Item key="changepassword">{t('IDS_CHANGE_PASSWORD')}</Menu.Item>
              </Menu.SubMenu>
            }
            {!isAuthenticated && <Menu.Item key="login"><Icon type="login" /><span>{t('IDS_LOGIN')}</span></Menu.Item>}
            {!isAuthenticated && <Menu.Item key="register"><Icon type="play-circle" /><span>{t('IDS_REGISTER')}</span></Menu.Item>}
            <Menu.Item key="help"><Icon type="info-circle" /><span>{t('IDS_GUIDE')}</span></Menu.Item>
            <Menu.Item key="support"><Icon type="question-circle" /><span>{t('IDS_SUPPORT')}</span></Menu.Item>
            {isAuthenticated && <Menu.Item key="logout"><Icon type="logout" /><span>{t('IDS_LOGOUT')}</span></Menu.Item>}
   

          </Menu>
        </div>
        <div className="select-language">
          <Dropdown overlay={menuLanguage}>
            <a className="ant-dropdown-link">{languageCode === 'vi' ? t('IDS_VIETNAMESE') : t('IDS_ENGLISH')} <Icon type="down" /></a>
          </Dropdown>
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
