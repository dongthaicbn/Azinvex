// actions
export const actionNavigateTo = (route, params = {}) => ({
  type: route,
  payload: params
});
