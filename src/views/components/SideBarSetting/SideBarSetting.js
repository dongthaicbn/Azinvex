import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import 'antd/dist/antd.css';
import ScrollBar from '../ScrollBar/ScrollBar';
import './SideBarSetting.scss';
import localize from '../../../utils/hocs/localize';

/*eslint-disable*/

class SideBarSetting extends React.Component {

  handleClickOutside = () => this.props.handleClose();
  render() {
    const { t } = this.props;
    return (
      <ScrollBar>
        <div className="sidebar-setting">
          <a id="customizer-toggle-icon" className="customizer-toggle bg-danger" onClick={this.props.handleClose}>
            <i className="ft-bell font-medium-4 white align-middle"/>
            {/*<span className="notification badge badge-pill badge-danger white">4</span>*/}
          </a>

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
      </ScrollBar>
    );
  }
}

const mapStateToProps = state => ({
  // state
});
export default compose(
  connect(
    mapStateToProps,
    {
      // action
    }
  ),
  localize
)(enhanceWithClickOutside(SideBarSetting));
