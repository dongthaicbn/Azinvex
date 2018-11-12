export const setExpert = uid => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const itemUpdates = {
    role: 'expert',
    totalpips: 0,
    signalWin: 0,
    signalLoss: 0,
    account: 0,
    updatedAt: firestore.FieldValue.serverTimestamp()
  };
  firestore.update({ collection: 'users', doc: uid }, itemUpdates);
};

export const unsetExpert = uid => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const itemUpdates = {
    role: 'member',
    signalLoss: firestore.FieldValue.delete(),
    signalWin: firestore.FieldValue.delete(),
    totalpips: firestore.FieldValue.delete(),
    account: firestore.FieldValue.delete(),
    updatedAt: firestore.FieldValue.serverTimestamp()
  };
  firestore.update({ collection: 'users', doc: uid }, itemUpdates);
};
