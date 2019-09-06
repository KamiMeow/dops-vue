import services from '@/middleware';
const { PactService } = services;

export const initialState = () => ({
  pacts: [],
});

export const mutations = {
  SET_PACTS: (state, pacts) => state.pacts = pacts,
  DELETE_PACT: (state, id) => state.pacts = state.pacts.filter(t => t.id !== id),
};

export const actions = {
  loadPacts({ commit }) {
    return new Promise((res) => {
      PactService
        .loadPacts()
        .then((response) => {
          commit('SET_PACTS', response.data);
          res({ error: false });
        });
    });
  },
  addPact({ dispatch }, data) {
    return new Promise((res) => {
      PactService
        .addPact(data)
        .then(() => {
          res({ error: false });
          dispatch('notification/set', {
            message: 'Пользователь успешно добавлен',
            type: 'success',
          }, { root: true });
        });
    });
  },
  editPact({ dispatch }, { data, id }) {
    return new Promise((res) => {
      PactService
        .editPact(data, id)
        .then(() => {
          res({ error: false });
          dispatch('notification/set', {
            message: 'Пользователь успешно изменён',
            type: 'success',
          }, { root: true });
        });
    });
  },

  loadPact(_, id) {
    return new Promise((res) => {
      PactService
        .loadPact(id)
        .then(response => {
          res({ error: false, data: response.data });
        });
    });
  },

  deletePact({ commit, dispatch }, id) {
    return new Promise((res) => {
      PactService
        .deletePact(id)
        .then(() => {
          res({ error: false });
          commit('DELETE_PACT', id);
          dispatch('notification/set', {
            message: 'Пользователь успешно удалён',
            type: 'success',
          }, { root: true });
        });
    });
  },
};

export const getters = {
  getPacts: state => state.pacts.sort((n, p) => n.id > p.id ? 1: -1),
};
