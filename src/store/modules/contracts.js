import services from '@/middleware';
const { ContractService } = services;

export const initialState = () => ({
  contracts: [],
});

export const mutations = {
  SET_CONTRACTS: (state, contracts) => state.contracts = contracts,
  DELETE_CONTRACT: (state, id) => state.contracts = state.contracts.filter(t => t.id !== id),
};

export const actions = {
  loadContracts({ commit }) {
    return new Promise((res) => {
      ContractService
        .loadContracts()
        .then((response) => {
          commit('SET_CONTRACTS', response.data);
          res({ error: false });
        });
    });
  },
  addContract({ dispatch }, data) {
    return new Promise((res) => {
      ContractService
        .addContract(data)
        .then(response => {
          res({ error: false, data: response.data });
          dispatch('notification/set', {
            message: 'Контракт успешно добавлен',
            type: 'success',
          }, { root: true });
        });
    });
  },
  editContract({ dispatch }, { data, id }) {
    return new Promise((res) => {
      ContractService
        .editContract(data, id)
        .then(() => {
          res({ error: false });
          dispatch('notification/set', {
            message: 'Контракт успешно изменён',
            type: 'success',
          }, { root: true });
        });
    });
  },

  loadContract(_, id) {
    return new Promise((res) => {
      ContractService
        .loadContract(id)
        .then(response => {
          res({ error: false, data: response.data });
        });
    });
  },

  deleteContract({ commit, dispatch }, id) {
    return new Promise((res) => {
      ContractService
        .deleteContract(id)
        .then(() => {
          res({ error: false });
          commit('DELETE_CONTRACT', id);
          dispatch('notification/set', {
            message: 'Контракт успешно удалён',
            type: 'success',
          }, { root: true });
        });
    });
  },
};

export const getters = {
  getContracts: state => state.contracts.sort((n, p) => n.id > p.id ? 1: -1),
};
