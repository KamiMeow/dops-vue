export default {
  loadUser(id) {
    return this.apiClient.get(`users/${id}`);
  },
  loadUsers() {
    return this.apiClient.get('users');
  },
  addUser(data) {
    return this.apiClient.post('users', data);
  },
  editUser(data, id) {
    return this.apiClient.put(`users/${id}`, data);
  },
  deleteUser(id) {
    return this.apiClient.delete(`users/${id}`);
  },
};
