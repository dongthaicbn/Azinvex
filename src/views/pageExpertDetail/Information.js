import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Card } from 'antd';
import './ExpertDetail.scss';
import localize from '../../utils/hocs/localize';

/* eslint-disable */
class Information extends Component {

  render() {
    const { expertDetail, t } = this.props;
    return (
      <Card className="card-container">
        <p className="header-card">{t('IDS_PERSONAL_INFORMATION')}</p>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="column-container">
            <div className="item-container">
              <p className="text-item"><a><b>{t('IDS_BIRTHDAY')}</b></a></p>
              <p className="sub-text-item">{expertDetail.information && new Date(expertDetail.birthday).toLocaleDateString('en-GB')}</p>
            </div>
            <div className="item-container">
              <p className="text-item"><a><b>{t('IDS_BIRTHPLACE')}</b></a></p>
              <p className="sub-text-item">{expertDetail.information && expertDetail.information.birthplace}</p>
            </div>
            <div className="item-container">
              <p className="text-item"><a><b>{t('IDS_ADDRESS')}</b></a></p>
              <p className="sub-text-item">{expertDetail.information && expertDetail.information.address}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="column-container">
            <div className="item-container">
              <p className="text-item"><a><b>{t('IDS_GENDER')}</b></a></p>
              <p className="sub-text-item">{expertDetail.information && expertDetail.information.sex == 0 ? "Nam":"Nữ"}</p>
            </div>
            <div className="item-container">
              <p className="text-item"><a><b>{t('IDS_EMAIL')}</b></a></p>
              <p className="sub-text-item">{expertDetail.email}</p>
            </div>
            <div className="item-container">
              <p className="text-item"><a><b>Website</b></a></p>
              <p className="sub-text-item">{expertDetail.information && expertDetail.information.website}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="column-container">
            <div className="item-container">
              <p className="text-item"><a><b>{t('IDS_PHONE_NUMBER')}</b></a></p>
              <p className="sub-text-item">{expertDetail.information && expertDetail.information.phone}</p>
            </div>
            <div className="item-container">
              <p className="text-item"><a><b>{t('IDS_OCCUPATION')}</b></a></p>
              <p className="sub-text-item">{expertDetail.information && expertDetail.information.occupation}</p>
            </div>
            <div className="item-container">
              <p className="text-item"><a><b>{t('IDS_JOINED_DATE')}</b></a></p>
              {expertDetail.createdAt &&
              <p className="sub-text-item">{new Date(expertDetail.createdAt.seconds * 1000).toLocaleDateString('en-GB')}</p>
              }
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default compose(
  connect(
    state => ({
      // state redux
    }),
    {
      // action
    }
  ),
  localize
)(Information);
