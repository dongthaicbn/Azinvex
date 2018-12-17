import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import 'antd/dist/antd.css';
import ScrollBar from '../ScrollBar/ScrollBar';
import './SideBarSetting.scss';
import localize from '../../../utils/hocs/localize';
/*eslint-disable*/

const colorArrFirst = [
  {data: 'pomegranate', color: { backgroundImage: 'linear-gradient(45deg, #9B3cb7, #FF396f)' }},
  {data: 'king-yna', color: { backgroundImage: 'linear-gradient(45deg, #1a2a6c, #b21f1f)' }},
  {data: 'ibiza-sunset', color: { backgroundImage: 'linear-gradient(45deg, #ee0979, #ff6a00)' }},
  {data: 'flickr', color: { backgroundImage: 'linear-gradient(45deg, #33001b, #ff0084)' }},
  {data: 'purple-bliss', color: { backgroundImage: 'linear-gradient(45deg, #360033, #0b8793)' }},
  {data: 'man-of-steel', color: { backgroundImage: 'linear-gradient(45deg, #780206, #061161)' }},
  {data: 'purple-love', color: { backgroundImage: 'linear-gradient(45deg, #cc2b5e, #753a88)' }}
];
const colorArrSecond = [
  {data: 'black', color: { backgroundColor: 'black' }},
  {data: 'white', color: { backgroundColor: 'white' }},
  {data: 'primary', color: { backgroundColor: '#009DA0' }},
  {data: 'success', color: { backgroundColor: '#0CC27E' }},
  {data: 'warning', color: { backgroundColor: '#FF8D60' }},
  {data: 'info', color: { backgroundColor: '#1CBCD8' }},
  {data: 'danger', color: { backgroundColor: '#FF586B' }}
];
class SideBarSetting extends React.Component {

  render() {
    const { t, imgName, handleChangeBGImage, handleChangeBGColor } = this.props;
    const sidebarImg = "../app-assets/img/sidebar-bg";
    return (
      <ScrollBar>
        <div className="sidebar-setting">
          <a id="customizer-toggle-icon" className="customizer-toggle bg-danger" onClick={this.props.handleTheme}>
            <i className="ft-settings font-medium-4 fa fa-spin white align-middle" />
          </a>
          <div data-ps-id="df6a5ce4-a175-9172-4402-dabd98fc9c0a" className="customizer-content p-3 ps-container ps-theme-dark">
            <p className="text-uppercase mb-0 text-bold-400 header-theme">Theme Customizer</p>
            <p>Customize & Preview in Real Time</p>
            <hr/>
            <h6 className="text-center text-bold-500 mb-3 text-uppercase">Sidebar Color Options</h6>
            <div className="cz-bg-color">
              <div className="row p-1">
                <div className="col" onClick={() => handleChangeBGColor({ backgroundImage: 'linear-gradient(45deg, #9B3cb7, #FF396f)' })}>
                  <span data-bg-color="pomegranate" className="gradient-pomegranate d-block rounded-circle color-contain" />
                </div>
                <div className="col" onClick={() => handleChangeBGColor({ backgroundImage: 'linear-gradient(45deg, #1a2a6c, #b21f1f)' })}>
                  <span data-bg-color="king-yna" className="gradient-king-yna d-block rounded-circle color-contain" />
                </div>
                <div className="col" onClick={() => handleChangeBGColor({ backgroundImage: 'linear-gradient(45deg, #ee0979, #ff6a00)' })}>
                  <span data-bg-color="ibiza-sunset" className="gradient-ibiza-sunset d-block rounded-circle color-contain" />
                </div>
                <div className="col" onClick={() => handleChangeBGColor({ backgroundImage: 'linear-gradient(45deg, #33001b, #ff0084)' })}>
                  <span data-bg-color="flickr" className="gradient-flickr d-block rounded-circle color-contain" />
                </div>
                <div className="col" onClick={() => handleChangeBGColor({ backgroundImage: 'linear-gradient(45deg, #360033, #0b8793)' })}>
                  <span data-bg-color="purple-bliss" className="gradient-purple-bliss d-block rounded-circle color-contain" />
                </div>
                <div className="col" onClick={() => handleChangeBGColor({ backgroundImage: 'linear-gradient(45deg, #780206, #061161)' })}>
                  <span data-bg-color="man-of-steel" className="gradient-man-of-steel d-block rounded-circle color-contain" />
                </div>
                <div className="col" onClick={() => handleChangeBGColor({ backgroundImage: 'linear-gradient(45deg, #cc2b5e, #753a88)' })}>
                  <span data-bg-color="purple-love" className="gradient-purple-love d-block rounded-circle color-contain" />
                </div>
              </div>
              <div className="row p-1">
                <div className="col" onClick={() => handleChangeBGColor({ backgroundColor: 'black' })}>
                  <span data-bg-color="black" className="bg-black d-block rounded-circle color-contain" />
                </div>
                <div className="col" onClick={() => handleChangeBGColor({ backgroundColor: 'white' })}>
                  <span data-bg-color="white" className="bg-grey d-block rounded-circle color-contain" />
                </div>
                <div className="col" onClick={() => handleChangeBGColor({ backgroundColor: '#009DA0' })}>
                  <span data-bg-color="primary" className="bg-primary d-block rounded-circle color-contain" />
                </div>
                <div className="col" onClick={() => handleChangeBGColor({ backgroundColor: '#0CC27E' })}>
                  <span data-bg-color="success" className="bg-success d-block rounded-circle color-contain" />
                </div>
                <div className="col" onClick={() => handleChangeBGColor({ backgroundColor: '#FF8D60' })}>
                  <span data-bg-color="warning" className="bg-warning d-block rounded-circle color-contain" />
                </div>
                <div className="col" onClick={() => handleChangeBGColor({ backgroundColor: '#1CBCD8' })}>
                  <span data-bg-color="info" className="bg-info d-block rounded-circle color-contain" />
                </div>
                <div className="col" onClick={() => handleChangeBGColor({ backgroundColor: '#FF586B' })}>
                  <span data-bg-color="danger" className="bg-danger d-block rounded-circle color-contain" />
                </div>
              </div>
            </div>
            <hr/>
            <h6 className="text-center text-bold-500 mb-3 text-uppercase">Sidebar Bg Image</h6>
            <div className="cz-bg-image row">
              <div className="col mb-3" onClick={() => handleChangeBGImage('01')}><img src={`${sidebarImg}/01.jpg`} width="90" className={`rounded ${imgName === '01' && 'active-img'}`} /></div>
              <div className="col mb-3" onClick={() => handleChangeBGImage('02')}><img src={`${sidebarImg}/02.jpg`} width="90" className={`rounded ${imgName === '02' && 'active-img'}`}/></div>
              <div className="col mb-3" onClick={() => handleChangeBGImage('03')}><img src={`${sidebarImg}/03.jpg`} width="90" className={`rounded ${imgName === '03' && 'active-img'}`}/></div>
              <div className="col mb-3" onClick={() => handleChangeBGImage('04')}><img src={`${sidebarImg}/04.jpg`} width="90" className={`rounded ${imgName === '04' && 'active-img'}`}/></div>
              <div className="col mb-3" onClick={() => handleChangeBGImage('05')}><img src={`${sidebarImg}/05.jpg`} width="90" className={`rounded ${imgName === '05' && 'active-img'}`}/></div>
              <div className="col mb-3" onClick={() => handleChangeBGImage('06')}><img src={`${sidebarImg}/06.jpg`} width="90" className={`rounded ${imgName === '06' && 'active-img'}`}/></div>
            </div>
            {/*<hr/>*/}
            {/*<div className="togglebutton">*/}
              {/*<div className="switch"><span>Sidebar Bg Image</span>*/}
                {/*<div className="float-right">*/}
                  {/*<div className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">*/}
                    {/*<input id="sidebar-bg-img" type="checkbox" className="custom-control-input cz-bg-image-display"/>*/}
                    {/*<label htmlFor="sidebar-bg-img" className="custom-control-label" />*/}
                  {/*</div>*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*</div>*/}
            {/*<hr/>*/}
            {/*<div className="togglebutton">*/}
              {/*<div className="switch"><span>Compact Menu</span>*/}
                {/*<div className="float-right">*/}
                  {/*<div className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">*/}
                    {/*<input id="cz-compact-menu" type="checkbox" className="custom-control-input cz-compact-menu"/>*/}
                    {/*<label htmlFor="cz-compact-menu" className="custom-control-label" />*/}
                  {/*</div>*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*</div>*/}
          </div>
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
)(SideBarSetting);
