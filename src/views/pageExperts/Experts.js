import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'antd';
import './Experts.scss';

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
  handleDetail = id => {
    window.location.href = `#/expert/${id}`;
  };
  render() {
    const { listExpert } = this.state;
    return (
      <div className="expert-container">
        <div className="content-container">
          <p className="header-text">Danh Sách Chuyên Gia</p>
          <p className="sub-header-text">Tổng Hợp Những Chuyên gia forex hàng đầu từ khắp mọi nơi</p>
          {listExpert.map((item, index) => (
            <Card
              hoverable
              key={index}
              style={{ width: 'calc(25% - 20px)', padding: 20, display: 'inline-block', margin: '0 10px' }}
              cover={<img alt="avatar" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
              <Card.Meta
                title={
                  <p>
                    <span>{item.name}</span>
                    <span style={{ float: 'right' }}>
                      <Button type="primary" className="detail-btn" onClick={() => this.handleDetail('0I6rvn354TURWK7gO4KS5osEtCf1')}>Chi tiết</Button>
                      <Button type="primary" className="follow-btn">{item.type}</Button>
                    </span>
                  </p>
                }
                description={
                  <div>
                    <p><span className="description-text-left">Tỉ lệ thắng</span><span className="description-text-right">15%</span></p>
                    <p><span className="description-text-left">Số Pips đạt</span><span className="description-text-right">-17.200000000000000</span></p>
                  </div>
                }
              />
            </Card>)
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    // state redux
  }),
  {
    // action
  }
)(Experts);
