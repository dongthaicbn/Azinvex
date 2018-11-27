export const setExpert = uid => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const itemUpdates = {
    role: 'expert',
    updatedAt: firestore.FieldValue.serverTimestamp()
  };
  firestore.update({ collection: 'users', doc: uid }, itemUpdates);
};

export const unsetExpert = uid => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const itemUpdates = {
    role: 'member',
    updatedAt: firestore.FieldValue.serverTimestamp()
  };
  firestore.update({ collection: 'users', doc: uid }, itemUpdates);
};
