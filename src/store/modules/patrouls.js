import services from '@/middleware';
const { PatroulService } = services;

export const initialState = () => ({
  patrouls: [],
});

export const mutations = {
  SET_PATROULS: (state, patrouls) => state.patrouls = patrouls,
  DELETE_PATROUL: (state, id) => state.patrouls = state.patrouls.filter(t => t.id !== id),
};

export const actions = {
  loadPatrouls({ commit }) {
    return new Promise((res) => {
      PatroulService
        .loadPatrouls()
        .then((response) => {
          commit('SET_PATROULS', response.data);
          res({ error: false });
        });
    });
  },
  addPatroul({ dispatch }, data) {
    return new Promise((res) => {
      PatroulService
        .addPatroul(data)
        .then(() => {
          res({ error: false });
          dispatch('notification/set', {
            message: 'Патруль успешно создан',
            type: 'success',
          }, { root: true });
        });
    });
  },
  editPatroul({ dispatch }, { data, id }) {
    return new Promise((res) => {
      PatroulService
        .editPatroul(data, id)
        .then(() => {
          res({ error: false });
          dispatch('notification/set', {
            message: 'Патруль успешно изменён',
            type: 'success',
          }, { root: true });
        });
    });
  },

  loadPatroul(_, id) {
    return new Promise((res) => {
      PatroulService
        .loadPatroul(id)
        .then(response => {
          res({ error: false, data: response.data });
        });
    });
  },

  deletePatroul({ commit, dispatch }, id) {
    return new Promise((res) => {
      PatroulService
        .deletePatroul(id)
        .then(() => {
          res({ error: false });
          commit('DELETE_PATROUL', id);
          dispatch('notification/set', {
            message: 'Патруль успешно удалён',
            type: 'success',
          }, { root: true });
        });
    });
  },
};

export const getters = {
  getPatrouls: state => state.patrouls.sort((n, p) => n.id > p.id ? 1: -1),
};
