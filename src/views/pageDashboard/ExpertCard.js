
/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Dashboard.scss';

class ExpertCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowed: null
    };
  }
  // follow(expert) {
  //   const { firestore, currentUser } = this.props
  //   firestore.set({ collection: 'relationships', doc: `${currentUser.uid}_${expert.id}` }, { followedId: expert.id, followerId: currentUser.uid, createdAt: firestore.FieldValue.serverTimestamp(), displayName: expert.displayName, photoURL: expert.photoURL, })
  //   this.setState({ isFollowed: true })
  // }
  // unfollow(followedId) {
  //   const { firestore, currentUser } = this.props
  //   firestore.delete({ collection: 'relationships', doc: `${currentUser.uid}_${followedId}` })
  //   this.setState({ isFollowed: false })
  // }
  render() {
    const { expert } = this.props;
    return (
      <div className="expert-card">
        <a href={'/#/expert/' + expert.id} >
          <img alt="96x96" src={expert.photoURL} />
        </a>
        <div className="body-expert-card">
          <h4 className="name">{expert.displayName}</h4>
        </div>
        {/*{this.state.isFollowed !== null ? 
        (this.state.isFollowed ? <button onClick={() => this.unfollow(expert.id)} type="button" className="d-flex ml-3 btn btn-raised btn-round gradient-man-of-steel btn-outline-grey py-2 width-150 justify-content-center">Unfollow</button> 
        : <button onClick={() => this.follow(expert)} type="button" className="d-flex ml-3 btn btn-raised btn-round gradient-man-of-steel btn-outline-grey py-2 width-150 justify-content-center">Follow</button>) : null}*/}
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
)(ExpertCard);
