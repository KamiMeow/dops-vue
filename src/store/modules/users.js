import services from '@/middleware';

const { UserService } = services;

export const initialState = () => ({
  users: [],
});

export const mutations = {
  SET_USERS: (state, users) => state.users = users,
  ADD_USER: (state, user) => state.users.push(user),
  DELETE_USER: (state, id) => state.users = state.users.filter(t => t.id !== id),
};

export const actions = {
  loadUsers({ commit }) {
    return new Promise((res) => {
      UserService
        .loadUsers()
        .then((response) => {
          commit('SET_USERS', response.data);
          res({ error: false });
        });
    });
  },
  addUser({ dispatch, commit }, data) {
    return new Promise((res) => {
      UserService
        .addUser(data)
        .then((response) => {
          res({ error: false, data: response.data });
          commit('ADD_USER', response.data);
          dispatch('notification/set', {
            message: 'Пользователь успешно добавлен',
            type: 'success',
          }, { root: true });
        });
    });
  },
  editUser({ dispatch }, { data, id }) {
    return new Promise((res) => {
      UserService
        .editUser(data, id)
        .then(() => {
          res({ error: false });
          dispatch('notification/set', {
            message: 'Пользователь успешно изменён',
            type: 'success',
          }, { root: true });
        });
    });
  },

  loadUser(_, id) {
    return new Promise((res) => {
      UserService
        .loadUser(id)
        .then((response) => {
          res({ error: false, data: response.data });
        });
    });
  },

  deleteUser({ commit, dispatch }, id) {
    return new Promise((res) => {
      UserService
        .deleteUser(id)
        .then(() => {
          res({ error: false });
          commit('DELETE_USER', id);
          dispatch('notification/set', {
            message: 'Пользователь успешно удалён',
            type: 'success',
          }, { root: true });
        });
    });
  },
};

export const getters = {
  getUsers: state => state.users.sort((n, p) => (n.id > p.id ? 1 : -1)),
};
