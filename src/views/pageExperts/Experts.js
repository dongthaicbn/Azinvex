import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import ExpertCard from './ExpertCard';
import { listenExperts, unlistenExperts } from './../../reduxModules/expert/expertActions';
import './Experts.scss';
import localize from '../../utils/hocs/localize';

/* eslint-disable */
class Experts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listExpert: [
        {
          name: 'Đặng Hải Long',
          type: 'Follow'
        },
        {
          name: 'Nguyễn Nhật Trung',
          type: 'Unfollow'
        },
        {
          name: 'Brian Nguyen',
          type: 'Follow'
        },
        {
          name: 'JackieHup',
          type: 'Unfollow'
        }
      ]
    };
  }
  componentDidMount(){
    this.props.listenExperts();
  }
  componentWillUnmount(){
    this.props.unlistenExperts();
  }
  render() {
    const { experts, t } = this.props;
    return (
      <div className="expert-container">
        <p className="header-text">{t('IDS_LIST_EXPERTS')}</p>
        <p className="sub-header-text">Tổng Hợp Những Chuyên gia forex hàng đầu từ khắp mọi nơi</p>
        {experts && experts.map(expert => (
          <ExpertCard key={expert.id} expert={expert} />
        ))}
      </div>
    );
  }
}

export default compose(
  connect(
    state => ({
      experts: state.firestore.ordered.experts
    }),
    {
      listenExperts,
      unlistenExperts
    }
  ),
  localize
)(Experts);
