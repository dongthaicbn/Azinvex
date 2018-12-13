/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, Button} from 'antd';
import { compose } from 'recompose';
import { follow, unfollow, isFollowed } from './../../reduxModules/follow/followActions';
import './Experts.scss';
import avatarUser from '../../assets/user.png';
import localize from '../../utils/hocs/localize';

class ExpertCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowed: null
    };
  }
  follow = expert => {
    this.props.follow(expert);
    this.setState({ isFollowed: true })
  };
  unfollow = followedId => {
    this.props.unfollow(followedId);
    this.setState({ isFollowed: false })
  };
  handleDetail = id => {
    window.location.href = `#/expert/${id}`;
  };
  async componentDidMount() {
    this.setState({ isFollowed: await this.props.isFollowed(this.props.expert.id) })
  }
  render() {
    const { expert, t } = this.props;
    const { isFollowed } = this.state;
    return (
      <div style={{ width: 'calc(33%)', padding: 20, display: 'inline-block' }}>
        <div className="card">
          <div className="card-header text-center">
            <img src={expert.photoURL === '/assets/user.png' ? avatarUser : expert.photoURL} alt="Brek" width="150" height="150"
                 className="rounded-circle gradient-mint" />
          </div>
          <br />
          <div className="card-body">
            <div className="card-block text-center">
              <h4 className="card-title">{expert.displayName}</h4>
              <p className="category text-gray font-small-4">CEO / Co-Founder</p>
              <button
                type="button"
                className="btn btn-raised btn-success btn-min-width mr-1 mb-1"
                onClick={() => this.handleDetail(expert.id)}
              >{t('IDS_DETAIL')}</button>
              {isFollowed !== null && !isFollowed ?
                <button
                  type="button"
                  className="btn btn-raised btn-success btn-min-width mr-1 mb-1"
                  onClick={() => this.follow(expert)}
                >
                  {t('IDS_FOLLOW')}
                </button> :
                <button
                  type="button"
                  className="btn btn-raised btn-success btn-min-width mr-1 mb-1"
                  onClick={() => this.unfollow(expert.id)}
                >
                  {t('IDS_UN_FOLLOW')}
                </button>
              }
              <hr className="grey" />
                <div className="row grey">
                  <div className="col-6">
                    <span className="description-text-left">{t('IDS_WIN_RATIO')}</span><span className="description-text-right">
                      {(expert.signalLoss + expert.signalWin) !== 0 ?
                        Math.round((expert.signalWin / (expert.signalLoss + expert.signalWin)) * 100) : 0
                      } %
                    </span>
                  </div>
                  <div className="col-6">
                    <span className="description-text-left">{t('IDS_TOTAL_PIPS')}</span><span className="description-text-right">{expert.totalpips && expert.totalpips.toFixed(1)}</span>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
    // return (
    //   <Card
    //     hoverable
    //     style={{ width: 'calc(25% - 20px)', padding: 20, display: 'inline-block', margin: '0 10px 20px' }}
    //     cover={<img alt="avatar" src={expert.photoURL === '/assets/user.png' ? avatarUser : expert.photoURL} className="avatar-image" />}
    //   >
    //     <Card.Meta
    //       title={
    //         <p>
    //           <span>{expert.displayName}</span>
    //           <span style={{ float: 'right' }}>
    //             <Button type="primary" className="detail-btn" onClick={() => this.handleDetail(expert.id)}>{t('IDS_DETAIL')}</Button>
    //             {isFollowed !== null &&
    //               !isFollowed ?
    //               <Button onClick={() => this.follow(expert)} type="primary" className="follow-btn">{t('IDS_FOLLOW')}</Button> :
    //               <Button onClick={() => this.unfollow(expert.id)} type="default" className="follow-btn">{t('IDS_UN_FOLLOW')}</Button>
    //             }
    //           </span>
    //         </p>
    //       }
    //       description={
    //         <div>
    //           <p>
    //             <span className="description-text-left">{t('IDS_WIN_RATIO')}</span><span className="description-text-right">
    //               {(expert.signalLoss + expert.signalWin) !== 0 ?
    //                 Math.round((expert.signalWin / (expert.signalLoss + expert.signalWin)) * 100) : 0
    //               } %
    //             </span>
    //           </p>
    //           <p><span className="description-text-left">Số Pips đạt</span><span className="description-text-right">{expert.totalpips && expert.totalpips.toFixed(1)}</span></p>
    //         </div>
    //       }
    //     />
    //   </Card>
    // );
  }
}

export default compose(
  connect(
    state => ({
      // state redux
    }),
    {
      follow,
      unfollow,
      isFollowed
    }
  ),
  localize
)(ExpertCard);
