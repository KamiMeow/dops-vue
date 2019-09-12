export const initialState = () => ({
  isSigned: true,
  name: '',
});

export const mutations = {
  LOGIN: state => state.isSigned = true,
  LOGOUT: state => state.isSigned = false,
  SET_NAME: (state, name) => state.name = name,
};

export const actions = {
  login({ commit }, name) {
    commit('SET_NAME', name);
    commit('LOGIN');
  },
  logout: ({ commit }) => commit('LOGOUT'),
};

export const getters = {
  isSigned: state => state.isSigned,
  getName: state => state.name,
};
