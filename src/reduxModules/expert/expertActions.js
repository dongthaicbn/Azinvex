export const listenExperts = () =>
  (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.setListener(
      {
        collection: 'users',
        where: ['role', '==', 'expert'],
        storeAs: 'experts'
      }
    );
  };
export const unlistenExperts = () =>
  (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.unsetListener(
      {
        collection: 'users',
        where: ['role', '==', 'expert']
      });
  };
