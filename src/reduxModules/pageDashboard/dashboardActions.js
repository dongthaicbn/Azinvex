export const getTopUser = () =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.setListener({
      collection: 'users',
      where: ['role', '==', 'expert'],
      orderBy: ['totalpips', 'desc'],
      storeAs: 'topExpert',
      limit: 5
    });
  };
export const getStatistics = () =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.setListener({
      collection: 'statistics',
      doc: 'website'
    });
  };
