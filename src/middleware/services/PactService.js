export default {
  loadPact(id) {
    return this.apiClient.get(`pacts/${id}`);
  },
  loadPacts() {
    return this.apiClient.get('pacts');
  },
  addPact(data) {
    return this.apiClient.post('pacts', data);
  },
  editPact(data, id) {
    return this.apiClient.put(`pacts/${id}`, data);
  },
  deletePact(id) {
    return this.apiClient.delete(`pacts/${id}`);
  },
};
