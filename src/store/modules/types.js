import services from '@/middleware';

const { TypeService } = services;

export const initialState = () => ({
  types: [],
});

export const mutations = {
  SET_TYPES: (state, types) => state.types = types,
  DELETE_TYPE: (state, id) => state.types = state.types.filter(t => t.is !== id),
};

export const actions = {
  loadTypes({ commit }) {
    return new Promise((res) => {
      TypeService
        .loadTypes()
        .then((response) => {
          commit('SET_TYPES', response.data);
          res({ error: false });
        });
    });
  },
  addType({ dispatch }, name) {
    return new Promise((res) => {
      TypeService
        .addType(name)
        .then(() => {
          res({ error: false });
          dispatch('notification/set', {
            message: 'Тип успешно добавлен',
            type: 'success',
          }, { root: true });
        });
    });
  },
  editType({ dispatch }, { name, id }) {
    return new Promise((res) => {
      TypeService
        .editType(name, id)
        .then(() => {
          res({ error: false });
          dispatch('notification/set', {
            message: 'Тип успешно изменён',
            type: 'success',
          }, { root: true });
        });
    });
  },

  loadType(_, id) {
    return new Promise((res) => {
      TypeService
        .loadType(id)
        .then(() => {
          res({ error: false });
        });
    });
  },

  deleteTypes({ commit, dispatch }, id) {
    return new Promise((res) => {
      TypeService
        .deleteType(id)
        .then(() => {
          res({ error: false });
          commit('DELETE_TYPE', id);
          dispatch('notification/set', {
            message: 'Тип успешно удалён',
            type: 'success',
          }, { root: true });
        });
    });
  },
};

export const getters = {
  getTypes: state => state.types,
};
