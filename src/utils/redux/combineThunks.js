const combineThunks = (...thunks) => dispatch => {
  thunks.forEach(thunk => dispatch(thunk));
};

export default combineThunks;
