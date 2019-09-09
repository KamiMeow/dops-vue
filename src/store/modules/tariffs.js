import services from '@/middleware';

const { TariffService } = services;

export const initialState = () => ({
  tariffs: [],
});

export const mutations = {
  ADD_TARIFF: (state, tariff) => state.tariffs.push(tariff),
  SET_TARIFFS: (state, tariffs) => state.tariffs = tariffs,
  DELETE_TARIFF: (state, id) => state.tariffs = state.tariffs.filter(t => t.id !== id),
};

export const actions = {
  loadTariffs({ commit }) {
    return new Promise((res) => {
      TariffService
        .loadTariffs()
        .then((response) => {
          commit('SET_TARIFFS', response.data);
          res({ error: false });
        });
    });
  },
  addTariff({ dispatch, commit }, data) {
    return new Promise((res) => {
      TariffService
        .addTariff(data)
        .then(response => {
          commit('ADD_TARIFF', response.data);
          res({ error: false });
          dispatch('notification/set', {
            message: 'Пакт успешно заключён',
            type: 'success',
          }, { root: true });
        });
    });
  },
  editTariff({ dispatch }, { data, id }) {
    return new Promise((res) => {
      TariffService
        .editTariff(data, id)
        .then(() => {
          res({ error: false });
          dispatch('notification/set', {
            message: 'Пакт успешно изменён',
            type: 'success',
          }, { root: true });
        });
    });
  },

  loadTariff(_, id) {
    return new Promise((res) => {
      TariffService
        .loadTariff(id)
        .then((response) => {
          res({ error: false, data: response.data });
        });
    });
  },

  deleteTariff({ commit, dispatch }, id) {
    return new Promise((res) => {
      TariffService
        .deleteTariff(id)
        .then(() => {
          res({ error: false });
          commit('DELETE_TARIFF', id);
          dispatch('notification/set', {
            message: 'Пакт успешно удалён',
            type: 'success',
          }, { root: true });
        });
    });
  },
};

export const getters = {
  getTariffs: state => state.tariffs.sort((n, p) => (n.id > p.id ? 1 : -1)),
};
