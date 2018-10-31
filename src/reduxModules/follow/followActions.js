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
