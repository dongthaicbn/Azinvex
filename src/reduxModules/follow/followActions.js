export const followSignal = ticket =>
  (dispatch, getState, { getFirestore }) => {
    const currentUser = getState().firebase.auth;
    const firestore = getFirestore();
    firestore.set(
      {
        collection: 'follows',
        doc: `${currentUser.uid}_${ticket}`
      },
      {
        ticket,
        followerId: currentUser.uid,
        createdAt: firestore.FieldValue.serverTimestamp()
      }
    );
  };
export const unfollowSignal = ticket =>
  (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const currentUser = getState().firebase.auth;
    firestore.delete({ collection: 'follows', doc: `${currentUser.uid}_${ticket}` });
  };
export const isFollowedSignal = ticket =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const currentUser = getState().firebase.auth;
    const doc = await firestore.get({ collection: 'follows', doc: `${currentUser.uid}_${ticket}` });
    return doc.exists;
  };
export const follow = expert =>
  (dispatch, getState, { getFirestore }) => {
    const currentUser = getState().firebase.auth;
    const firestore = getFirestore();
    firestore.set(
      {
        collection: 'relationships',
        doc: `${currentUser.uid}_${expert.id}`
      },
      {
        followedId: expert.id,
        followerId: currentUser.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
        displayName: expert.displayName,
        photoURL: expert.photoURL
      }
    );
  };
export const unfollow = followedId =>
  (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const currentUser = getState().firebase.auth;
    firestore.delete({ collection: 'relationships', doc: `${currentUser.uid}_${followedId}` });
  };
export const isFollowed = followedId =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const currentUser = getState().firebase.auth;
    const doc = await firestore.get({ collection: 'relationships', doc: `${currentUser.uid}_${followedId}` });
    return doc.exists;
  };
export const listenFollowedExpert = () =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const currentUser = getState().firebase.auth;
    firestore.setListener(
      {
        collection: 'relationships',
        where: ['followerId', '==', currentUser.uid],
        storeAs: 'followedExperts'
      }
    );
  };
export const unlistenFollowedExpert = () =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const currentUser = getState().firebase.auth;
    firestore.unsetListener(
      {
        collection: 'relationships',
        where: ['followerId', '==', currentUser.uid]
      }
    );
  };
