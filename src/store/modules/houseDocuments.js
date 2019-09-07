import services from '@/middleware';

const { HouseDocumentService } = services;

export const initialState = () => ({
  houseDocuments: [],
});

export const mutations = {
  SET_HOUSE_DOCUMENTS: (state, houseDocuments) => state.houseDocuments = houseDocuments,
  DELETE_HOUSE_DOCUMENT: (state, id) => state.houseDocuments = state.houseDocuments.filter(t => t.id !== id),
};

export const actions = {
  loadHouseDocuments({ commit }) {
    return new Promise((res) => {
      HouseDocumentService
        .loadHouseDocuments()
        .then((response) => {
          commit('SET_HOUSE_DOCUMENTS', response.data);
          res({ error: false });
        });
    });
  },
  addHouseDocument({ dispatch }, data) {
    return new Promise((res) => {
      HouseDocumentService
        .addHouseDocument(data)
        .then((response) => {
          res({ error: false, data: response.data });
          dispatch('notification/set', {
            message: 'Документы успешно добавлены',
            type: 'success',
          }, { root: true });
        });
    });
  },
  editHouseDocument({ dispatch }, { data, id }) {
    return new Promise((res) => {
      HouseDocumentService
        .editHouseDocument(data, id)
        .then(() => {
          res({ error: false });
          dispatch('notification/set', {
            message: 'Документы успешно изменёны',
            type: 'success',
          }, { root: true });
        });
    });
  },

  loadHouseDocument(_, id) {
    return new Promise((res) => {
      HouseDocumentService
        .loadHouseDocument(id)
        .then((response) => {
          res({ error: false, data: response.data });
        });
    });
  },

  deleteHouseDocument({ commit, dispatch }, id) {
    return new Promise((res) => {
      HouseDocumentService
        .deleteHouseDocument(id)
        .then(() => {
          res({ error: false });
          commit('DELETE_HOUSE_DOCUMENT', id);
          dispatch('notification/set', {
            message: 'Документы успешно удалёны',
            type: 'success',
          }, { root: true });
        });
    });
  },
};

export const getters = {
  getHouseDocuments: state => state.houseDocuments.sort((n, p) => (n.id > p.id ? 1 : -1)),
};
