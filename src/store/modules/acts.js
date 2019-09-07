import services from '@/middleware';

const { ActService } = services;

export const initialState = () => ({
  acts: [],
});

export const mutations = {
  SET_ACTS: (state, acts) => state.acts = acts,
  DELETE_ACT: (state, id) => state.acts = state.acts.filter(t => t.id !== id),
};

export const actions = {
  loadActs({ commit }) {
    return new Promise((res) => {
      ActService
        .loadActs()
        .then((response) => {
          commit('SET_ACTS', response.data);
          res({ error: false });
        });
    });
  },
  addAct({ dispatch }, data) {
    return new Promise((res) => {
      ActService
        .addAct(data)
        .then(() => {
          res({ error: false });
          dispatch('notification/set', {
            message: 'Пакт успешно заключён',
            type: 'success',
          }, { root: true });
        });
    });
  },
  editAct({ dispatch }, { data, id }) {
    return new Promise((res) => {
      ActService
        .editAct(data, id)
        .then(() => {
          res({ error: false });
          dispatch('notification/set', {
            message: 'Пакт успешно изменён',
            type: 'success',
          }, { root: true });
        });
    });
  },

  loadAct(_, id) {
    return new Promise((res) => {
      ActService
        .loadAct(id)
        .then((response) => {
          res({ error: false, data: response.data });
        });
    });
  },

  deleteAct({ commit, dispatch }, id) {
    return new Promise((res) => {
      ActService
        .deleteAct(id)
        .then(() => {
          res({ error: false });
          commit('DELETE_ACT', id);
          dispatch('notification/set', {
            message: 'Пакт успешно удалён',
            type: 'success',
          }, { root: true });
        });
    });
  },
};

export const getters = {
  getActs: state => state.acts.sort((n, p) => (n.id > p.id ? 1 : -1)),
};
